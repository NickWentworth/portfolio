---
title: 'Move Generation'
---

# Working With Bitboards

A great benefit of using bitboards to represent positions is how efficiently we can generate moves with them.

If we have a bitboard with a single `1` bit in it, a move from that square can be represented by just one bitwise shift instruction. We can pre-determine what these shifts must be by determining the offset that each cardinal direction is. For example, examine the offsets each other square is from an initial square of `d5`:

<Bitboard squares={[27]} showOffsetsFrom={27} />

Notice that a move in each cardinal direction is just `+/- 1` or `+/- 8`. For convenience, lets store these four directions as constants in a `Direction` impl:

```rust
impl Direction {
    pub const N: isize = -8;
    pub const E: isize = 1;
    pub const S: isize = 8;
    pub const W: isize = -1;
}
```

Also, a more complicated move can be calculated by adding up any sequence of cardinal directions. Say we want to move both down and to the right, we can just shift by the result of `Direction::S + Direction::E`.

Finally, we have to setup a custom shift instruction for our `Bitboard` struct, as Rust doesn't allow bitwise shifting of negative numbers. To handle this, we can conditionally shift left or right based on the sign of the number:

```rust
impl Shr<isize> Bitboard {
    fn shr(self, dir: isize) -> Bitboard {
        // notation is like this because Bitboard wraps a u64,
        // so get the u64 with self.0 and return a new Bitboard wrapping the result
        if dir >= 0 {
            Bitboard(self.0 >> dir)
        } else {
            Bitboard(self.0 << -dir)
        }
    }
}
```

Now for example, this is what a single knight move going `Direction::N + Direction::E + Direction::E` might look like from that initial `d5` square:

<div className='flex flex-wrap justify-center gap-4'>
    <Bitboard squares={[27]} description='knight_board' />
    <Bitboard squares={[21]} description='knight_board >> (N + E + E)' />
</div>

# Pseudo-Legal Moves

First, let's consider the generation of [pseudo-legal moves](https://www.chessprogramming.org/Pseudo-Legal_Move), which are defined as moves that follow the rules of each piece's movement patterns, but do not consider the safety of the `King`. We begin with generating these, as considering full legality of a move has some extra caveats which will be discussed afterwards.

To generate pseudo-legal moves for a position, the general process is to iterate through each `Piece` of the actively moving `Color`, and generate a bitboard of possible destination squares for this piece to move to. The process for generating moves varies per piece type, so we can roughly split each piece into 3 categories.

## Jumping Pieces

The simplest pieces to generate moves for are the jumping pieces, which have a constant set of moves that can either be made or are blocked. For both the `King` and `Knight`, we can just take a bitwise `OR` of all resulting bitboards that are shifted from the piece's initial square.

Sticking with `d5` as our initial square, the king and knight bitboards would look as follows:

<div className='flex flex-wrap justify-center gap-4'>
    <Bitboard squares={[18,19,20,26,28,34,35,36]} description='king_moves' />
    <Bitboard squares={[10,12,17,21,33,37,42,44]} description='knight_moves' />
</div>

Care must be taken when moving near the edges of the board. Because our bitboard is essentially just a 1-D array of bits, a piece can shift off of one side of the board and appear on the other. We only really need to worry about horizontal overflow, because overflow in the vertical direction would just result in the bit disappearing, which works perfectly for us.

To handle this, we can use file masks to filter out pieces on certain files before doing a shift. For example, moves for the `King` are generated as follows. Notice that whenever there is a `W` or `E` move, a file-masked version of the position is used.

```rust
fn generate_king_moves(king_position: Bitboard) -> Bitboard {
    // board to store all valid moves
    let mut board = Bitboard::empty();

    // generate masked position bitboards
    let king_position_a_mask = king_position & FileBoundMask::A;
    let king_position_h_mask = king_position & FileBoundMask::H;

    // generate moves by bit shifting in each direction
    board |= king_position_a_file_masked >> Direction::NW;
    board |= king_position_a_file_masked >> Direction::W;
    board |= king_position_a_file_masked >> Direction::SW;
    board |= king_position >> Direction::N;
    board |= king_position >> Direction::S;
    board |= king_position_h_file_masked >> Direction::NE;
    board |= king_position_h_file_masked >> Direction::E;
    board |= king_position_h_file_masked >> Direction::SE;

    board
}
```

Finally, we just have to determine which of the possible locations are actually valid (still pseudo-legal) moves. Obviously, from the initial position, the king can't move anywhere becasue it is surrounded by neighboring pieces.

To remedy this, we need to build another bitboard to mask out invalid squares. In our case, the only invalid squares are those of the same color, so we can bitwise `NOT` that board, resulting in a bitboard that properly masks out moves that would land on same-color pieces.

```rust
generate_king_moves(king_position) & !board.active_pieces();
```

This is what the process looks like visually with the initial white knight on `b1`:

<div className='flex flex-wrap justify-center gap-4'>
    <Bitboard squares={[40,42,51]} description='generate_knight_moves()' />
    <Bitboard
        squares={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]}
        description='!board.active_pieces()'
    />
</div>

<Bitboard squares={[40,42]} description='generate_knight_moves() & !board.active_pieces()' />

## Pawns

Although `Pawn`s are technically jumping pieces, they have some extra rules to them. Let's split up pawn moves into 3 categories:

1. Single advancement
    - The simplest type of pawn move and nearly the same as for other jumping pieces. Shift the pawn in the correct direction, `Direction::N` for `White`, `Direction::S` for `Black`.
    - The only difference here is we want to mask out ALL other pieces, because a pawn advancement cannot take opposing pieces either.
2. Double advancement
    - Same as single advancement, except only consider a double move if the pawn is on its home rank and the single move was successful after the masking.
    - In practice, this is done by simply taking the resulting single advancement bitboard and shifting it in that same direction again. If the single board was empty, the double will be as well.
3. Diagonal attack
    - Again, do the shift to get the resulting destination, this time mask for ONLY opposing pieces, as the diagonal move can only attack.
    - Since we are moving `Direction::E` or `Direction::W` here, file masks are used again for each side.

## Sliding Pieces

The final 3 piece types, `Bishop`, `Rook`, and `Queen` are slightly more difficult to find moves for, due to the nature of their movement. They are able to move continuously in a direction, but upon hitting any piece they must stop. The process for efficiently generating these moves are as follows:

1. Generate sliding rays for the current square on the board, in whichever directions the piece can attack
    - This is done by starting from the square and incrementally shifting in the direction, `OR`-ing as we go, until we eventually shift onto the other side of the board.
    - For example, this would be the ray generated moving `Direction::NE` from `b2`:

<Bitboard squares={[42,35,28,21,14,7]} description='generate_sliding_ray(b2_board, Direction::NE)' />

2. For each direction, find the first blocking piece's square

    - Bitwise `AND` the generated sliding ray with a mask containing all pieces, resulting in a `blocker_board` containing all pieces that would block this ray.
    - Find the location of the first blocker in the board by using the [bitscan](https://www.chessprogramming.org/BitScan) function on the `blocker_board`.
        - This is based off of a CPU instruction that can return the number of trailing or leading `1`s or `0`s in the bitboard.
        - If the direction is positive, scan for the number of leading zeros, if negative find the trailing zeros.
        - Then, compute the square index based on if we found the leading or trailing zeros.

```rust
impl Bitboard {
    pub fn get_first_square(self) -> Square {
        self.0.leading_zeros() as Square
    }

    pub fn get_last_square(self) -> Square {
        (63 - self.0.trailing_zeros()) as Square
    }
}
```

3. Finally if the sliding ray is blocked, clip off the extra squares
    - We can generate another sliding ray in the same direction, but from the `first_blocker` square.
    - Then, a bitwise `XOR` the initial ray with a ray from the `first_blocker`'s square.
    - For example, say there is a blocker in that `b2` `Direction::NE` ray on square `e5`:

<div className='flex flex-wrap items-center justify-center gap-4'>
    <Bitboard squares={[42,35,28,21,14,7]} description='b2_NE_ray' />
    `XOR`
    <Bitboard squares={[21,14,7]} description='blocker_ray' />
    `=`
    <Bitboard squares={[42,35,28]} description='clipped_attack' />
</div>

The entire process is summed up in the following function. To allow this same function to be used for both `Bishop`, `Rook`, and `Queen`, we can just pass a slice of directions to be used, depending on the piece we are generating moves for.

```rust
fn generate_sliding_moves(pos: Bitboard, dirs: &[isize], board: &Board) -> Bitboard {
    let mut moves = Bitboard::empty();

    for direction in dirs {
        // generate sliding ray and find all pieces blocking it
        let ray = generate_sliding_ray(pos, direction);
        let blocker_board = ray & board.all_pieces();

        if blocker_board.is_empty() {
            // if no blockers, add the entire ray to moves
            moves |= ray
        } else {
            // if there is a blocker, find the first one in the ray
            let first_blocker = if direction > 0 {
                blocker_board.get_first_square()
            } else {
                blocker_board.get_last_square()
            };

            // then clip the attack from the first blocker and add it to moves
            let blocker_pos = Bitboard::shifted_by(first_blocker);
            moves |= ray ^ generate_sliding_ray(blocker_pos, direction);
        }
    }

    moves
}
```

As usual, we can then mask out all same-colored pieces after generating the moves per sliding piece.

# Legal Moves

Generating legal moves can be done in one of 2 ways:

1. Generate pseudo-legal moves first, then temporarily make each move on the board. If the king can then immediately be taken, the move is not legal. Afterwards, unmake the move and continue generating.
    - This is a very convenient approach, as we nearly have everything we need, but it is also the much slower option.
    - There are many illegal moves that that would have to be generated, made, checked, and unmade.
2. Generate only legal moves during move generation, filtering out illegal moves without making them beforehand.
    - This approach obviously has more edge cases to worry about, such as checks and pins, but there is no need to make, check, and unmake every move.

Otter decides to generate legal moves in-place as opposed to the slower strategy, so there are some extra masking boards that need to be built before the moves are generated.

-   `king_move_mask`: Masks out all squares currently being attacked
    -   This bitboard is specific to the `King` so that it cannot move into an attacked square.
-   `capture_mask`: Mask of all opposing pieces currently putting the king into check
    -   Allows opposing pieces directly attacking the king to be taken.
    -   If in a double check, this board is empty as the only valid moves would be king moves.
-   `block_mask`: Mask of the sliding attack rays of opposing sliding pieces currently putting the king into check
    -   Allows friendly pieces to block the any sliding attacks on the king.
    -   If in a double check, this board is empty as the only valid moves would be king moves.
-   `pin_mask`: Mask of the sliding attack rays of opposing sliding pieces currently pinning a friendly piece onto the king
    -   Ensures that pieces currently pinned cannot move out from the pin and allow the king to be attacked.

These masks are applied throughout the move generation phase when required, so that all moves generated are valid, legal moves to be made.

# Move Bitboards to Structs

The final step is converting the move bitboards into a struct containing all required data for the `Board` to make the move. This is also done during move generation, and each `Move` stores the following:

```rust
struct Move {
    from: Square,   // where the piece is moving from
    to: Square,     // where to piece is moving to
    piece: Piece,   // the type of piece moving
    flag: MoveFlag, // designates the type of move, see below
}

enum MoveFlag {
    Quiet,                          // regular move that doesn't have any flags
    Capture(Piece),                 // opponent piece that was captured
    Promotion(Piece),               // pawn was promoted into a piece
    CapturePromotion(Piece, Piece), // opponent piece that was captured and the piece promoted into
    PawnDoubleMove(Square),         // a pawn double moved, stores the en passant target square
    EnPassantCapture(Square),       // holds the square of the captured (just en passant-ed) pawn
    KingCastle,                     // kingside castle
    QueenCastle,                    // queenside castle
}
```

Finally the `Board` must be able to make and unmake `Move`s. Obviously we need to be able to make moves, and unmaking moves is essential later on once we begin searching and evaluating move trees.

Making moves is relatively straightforward, but we need to store a history of previous `GameState`s and `Move`s to be able to unmake moves. Unmaking a move is essentially reverting any changes from the previously made move and restoring the previous game state.

```rust
struct Board {
    // ... previous fields ...
    history: Vec<(Move, GameState)>,
}

impl Board {
    pub fn make_move(&mut self, m: Move) {
        // push this move and current history for unmaking later on
        self.history.push((m, self.game_state));

        // finish making move and update game state
    }

    pub fn unmake_move(&mut self) {
        // pop previous move from history
        let (m, prev_state) = match self.move_history.pop() {
            Some(history) => history,
            None => return, // if no history, return early
        };

        // finish unmaking move

        self.game_state = prev_state;
    }
}
```
