---
title: 'Board Representation'
---

The first step in writing a chess engine is deciding how to represent the board state. This choice will heavilty affect the process and efficiency of move generation, an integral part of the chess engine.

# Bitboards

Modern computers are built and optimized to work with 64-bit values very efficiently. Conveniently, there are also exactly 64 squares on a chess board. This is the inspiration behind a [bitboard](https://www.chessprogramming.org/Bitboards), which is simply a 64 bit integer, able to store 1 bit of information per square on the board.

<Bitboard squares={[]} showOffsetsFrom={0} />

Since there can be 12 different pieces per square, we need to decide what data to store to have full information on the board, but without working with too many bitboards. Typically, engines store 8 different bitboards to represent the current positions on a full chess board:

-   `colors: [Bitboard; 2]`, indexed by `Black` and `White`
-   `pieces: [Bitboard; 6]`, indexed by `King`, `Queen`, `Rook`, `Bishop`, `Knight`, and `Pawn`

For example, some bitboards describing the initial position would be stored as follows:

<div className='flex flex-wrap justify-center gap-4'>
    <Bitboard
        description='colors[Black]'
        squares={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}
    />
    <Bitboard
        description='colors[White]'
        squares={[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]}
    />
</div>

<div className='flex flex-wrap justify-center gap-4'>
    <Bitboard
        description='pieces[Pawn]'
        squares={[8,9,10,11,12,13,14,15,48,49,50,51,52,53,54,55]}
    />
    <Bitboard
        description='pieces[Rook]'
        squares={[0,7,56,63]}
    />
</div>

Since we are working with simple integers, we can use quick bitwise operations to find the intersection and union of any set of bitboards, using bitwise `AND` and `OR`, respectively. Say we want to find all black pawns:

<Bitboard description='colors[Black] & pieces[Pawn]' squares={[8,9,10,11,12,13,14,15]} />

There is some more data that has to be stored apart from piece positions, such as the current moving color and castling rights. This is stored in a separate `GameState` struct, which when combined with the `colors` and `pieces` bitboard lists, make up the basis of a `Board`.

# FEN

Another way to represent the state of a chess game is through [Forsyth-Edwards Notation](https://www.chessprogramming.org/Forsyth-Edwards_Notation), or FEN.

A FEN string is a moderately short ASCII string, which like our `Board` struct, contains all of the necessary information to represetn any board state. For example, this is the FEN string for the initial position:

<div className='self-center'>
    `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
</div>

Notice the FEN string is 6 space-separated fields, each describing part of the game state:

1. Piece Positions: `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR`
    - Piece positions are given as `/`-separated segments, with each segment storing a rank of the board, starting from the top-most rank.
    - For each rank, fill in squares from left to right as follows:
        - Symbol (`KkQqRrBbNnPp`), there is a piece on this square, `K` for `King`, `Q` for `Queen`, `R` for `Rook`, `B` for `Bishop`, `N` for `Knight`, `P` for `Pawn`. Uppercase symbols are `White` pieces and lowercase are `Black` pieces.
        - Number (`1-8`), that number designates how many empty squares there are in a row.
2. Current Turn: `w`
    - The currently moving color, `w` for `White`, `b` for `Black`
3. Castling Rights: `KQkq`
    - Rights for both kingside `K` and queenside `Q` castling, uppercase for `White` and lowercase for `Black`.
    - If all castling rights are unavailable, `-` fills this segment.
4. En Passant Square: `-`
    - The current en passant target square, given in algebraic notation (ex: `d3`).
    - If the last move wasn't a pawn double move, `-` fills this segment.
5. Halfmove Counter: `0`
    - The current number of half moves, incremented after either colors moves, since the last capture or pawn advancement.
6. Fullmove Counter: `1`
    - The current full move of the game, incremented after both colors move, starting from `1`

Having a standardized and easily parsable format is convenient for importing and exporting chess positions, especially because the internals of different chess engine vary wildly.
