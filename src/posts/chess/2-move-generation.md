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

## Sliding Pieces
