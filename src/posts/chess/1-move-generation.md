---
title: 'Move Generation'
---

What good is a chess engine if it isn't able to generate moves at any given position?

Setting up a board, reliably generating moves, and allowing those moves to be made/unmade is the first step in creating a chess engine.

# Board Representation

Modern computers are built and optimized to work with 64-bit values very efficiently. Conveniently, there are also exactly 64 squares on a chess board. This is the inspiration behind a [bitboard](https://www.chessprogramming.org/Bitboards), which is simply a 64 bit integer, able to store 1 bit of information per square on the board.

<Bitboard squares={[]} showNumbers />

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
