---
title: 'Transposition Table'
date: '2024-06-25'
summary: 'Caching evaluations in transposition tables using Zobrist hashing'
---

Let's define a term we will use throughout this post, a [transposition](https://www.chessprogramming.org/Transposition). Transpositions are simply identical positions that are reached by different sequences of moves.

Due to the brute force nature of alpha-beta search, we commonly reach the same transposition and evaluate it multiple times, each getting an identical `Score`. Even worse, these transpositions often occur at earlier depth values, so their entire subtrees must be searched and evaluated as well.

Since we've already done the work to evaluate a position, it should be saved for later in case it shows up again! This looks like a great use case for a `HashMap`, but we have to first allow our `Board` to be hashed.

# Zobrist Hashing

If you are unfamiliar with hashing, `hash()` is a function that takes in some data and outputs a uniformly random value.

In the context of our chess engine, we would like our `hash()` to take in a transposition and output a `u64`, or 64-bit integer. Two identical transpositions should have the same hash, and different transpositions would have different hashes.

<div className='self-center flex gap-1'>
    <div className='flex flex-col gap-1'>
        <div>`Board1` =></div>
        <div>`Board2` =></div>
    </div>
    <div>
        <code className='block h-full content-center'>hash()</code>        
    </div>
    <div className='flex flex-col gap-1'>
        <div>=> `17248971289471` (random `u64` value)</div>
        <div>=> `81248197240235` (different `u64` value)</div>
    </div>
</div>

Generally in Rust, we would just add a `#derive(Hash)` to the `Board` struct, allowing it to be used in the built-in `std::collections::HashMap`. This approach significantly slows down the engine due to how slowly the derived `hash()` function is for our `Board`.

A slightly better option is using the FEN string, as mentioned in [an earlier post](/blog/chess/board-representation). This handles transpositions like we'd want, but is still a bit too slow for our liking, as it needs to be generated fresh after each move.

A relatively simple and effective option for generating an incremental hash for our `Board` is a technique called [Zobrist hashing](https://www.chessprogramming.org/Zobrist_Hashing).

Zobrist hashing works by generating pseudo-random `u64` values for every factor that would cause two positions to be different transpositions. These values are then bitwise `XOR`-ed with eachother to generate a hash. The following values are generated at program startup and stored within a Zobrist struct:

<table className='self-center'>
    <thead>
        <tr>
            <th>Factor</th>
            <th>Indexed by</th>
            <th># Values </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Different pieces in different positions</td>
            <td>`Zobrist.pieces[Color][Piece][Square]`</td>
            <td>`6 * 2 * 64`</td>
        </tr>
        <tr>
            <td>Different currently moving colors</td>
            <td>`Zobrist.turn`</td>
            <td>`1`</td>
        </tr>
        <tr>
            <td>Different castling rights</td>
            <td>`Zobrist.castling[Color][CastleSide]`</td>
            <td>`2 * 2`</td>
        </tr>
        <tr>
            <td>Different en passant target squares</td>
            <td>`Zobrist.en_passant[Square]`</td>
            <td>`64`</td>
        </tr>
        <tr>
            <td>**Total**</td>
            <td></td>
            <td>`837`</td>
        </tr>
    </tbody>
</table>

This results in a set of `837` different pseudo-random values. To then generate a Zobrist hash for a transposition, we just take a bitwise `XOR` of each value that would describe the transposition. For example, the opening position would be:

```rust
let hash = Zobrist.piece[Black][Pawn][a8]
         ^ Zobrist.piece[Black][Knight][b8]
         // ... (remaining pieces, ignoring empty squares) ...
         ^ Zobrist.piece[White][Rook][h1]
         ^ Zobrist.turn
         ^ Zobrist.castling[White][Queenside]
         // ... (rest of castling)
```

Bitwise `XOR` is used here because it has a very valuable property: `XOR` is its own inverse. This means an `XOR` operation can always be undone by applying the `XOR` again.

This useful property allows for incremental hashing as moves are made and unmade, as opposed to remaking the hash fresh every time. For example, say we move the `White` `Pawn` from `d2` to `d4`, we can just update the hash for the board:

```rust
let new_hash = hash                           // start from previous hash
             ^ Zobrist.piece[White][Pawn][d2] // white pawn leaves d2
             ^ Zobrist.piece[White][Pawn][d4] // white pawn arrives to d4
             ^ Zobrist.en_passant[d3]         // d3 is a possible en passant square
             ^ Zobrist.turn                   // and always swap turn
```

# The Transposition Table

Now that we have a way to generate a (mostly) unique hash value for any board transposition, we can build our `TranspositionTable`, which is really just a `HashMap` with its keys being pre-calculated Zobrist hashes.

To create the `TranspositionTable`, we need to specify a size. Otter supports variable sizes based on the capabilities on the system, but defaults it to 512 MB. The total capacity of the table is calculated at initialization and is immediately allocated and zeroed out.

Past this, everything really just follows a simple `HashMap` implementation, summarized below:

```rust
// use a generic type "D" to allow different entry types
struct TranspositionTable<D> {
    table: <Vec<Entry<D>>,
    capacity: usize;
}

// an entry just pairs a data type and zobrist hash together
struct Entry<D> {
    hash: ZobristHash,
    data: D,
}

impl TranspositionTable<D> where D: Copy + Default {
    pub fn new(mb: usize) -> Self {
        // calculate how many entries can be stored in the table
        let capacity = (mb * 1024 * 1024) / size_of::<D>();

        // initialize empty table filled with zeroed-out entries
        let table = vec![Entry { hash: 0, data: D::default() }; capacity];

        TranspositionTable { table, capacity }
    }

    /// Returns an index into the internal table from the given hash value
    fn hash_index(&self, hash: ZobristHash) -> usize {
        (hash as usize) % self.capacity;
    }

    /// Insert an entry into the table, overwriting on collision
    pub fn insert(&mut self, hash: ZobristHash, data: D) {
        let idx = self.hash_index(hash);
        self.table[idx] = Entry { hash, data };
    }

    /// Get the entry from the given hash, return None if not found or was overwritten
    pub fn get(&self, hash: ZobristHash) -> Option<D> {
        let idx = self.hash_index(hash)
        let entry = self.table[idx];

        if entry.hash == hash {
            // if this is the stored hash, return it
            Some(entry.data)
        } else {
            // if not, the entry was overwritten or wasn't inserted
            None
        }
    }
}
```
