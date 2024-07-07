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

# Use During Search

Now we have to actually use the transposition table to realize its benefits! Setting up a `TranspositionTable` within our alpha-beta search is done with a few careful considerations.

Due to the way that alpha-beta works, simply storing a `Score` value isn't enough to accurately describe the evaluation of some positions, because some positions might be represented as lower or upper bounds. These different types of evaluations are stored as a variant of a `ScoreLimit` enum:

```rust
enum ScoreLimit {
    // An exact evaluation was found.
    Exact,

    // A move was found that was too good for us, so this branch was trimmed early due to
    // the opponent having a better option. Because this branch returned early,
    // a better move might be there for this position but wasn't discovered yet.
    // So, the current score value is stored as a lower bound.
    Beta,

    // During search, no move was found to be better for us than a previously found option from
    // a different position. Storing this is more of a detail from how alpha-beta works,
    // as the value we get might not be an exact evaluation, but instead an upper bound.
    Alpha,
}
```

Along with the `Score` value and `ScoreLimit` flag, we want to store some extra data to help improve the search speed and accuracy, which will be discussed later. Let's put this all together into a `ScoreData` struct, which is the generic type that our `TranspositionTable` stores.

```rust
struct ScoreData {
    score: Score,
    flag: ScoreLimit,
    depth: u8,               // the depth this evaluation was determined for
    best_move: Option<Move>, // the best move (if found) to make from this position
}
```

Finally, let's get into inserting and fetching from our table, which ends up being pretty straightforward.

## Inserting

Inserting is done during the searching portion of `alpha_beta()`, after an evaluation is calculated.

There are 3 different scenarios that correspond to each `ScoreLimit` we've determined:

-   After searching through all moves, if a more accurate upper-bound is found, insert that `alpha` value, a `ScoreLimit::Exact` flag, and the `best_move` that lead to this score.
-   If after searching through all moves, no improved upper-bound was found, insert the initial `alpha` value with a `ScoreLimit::Alpha` flag and no `best_move`.
-   If while searching, we need to trim the branch, insert the current `beta` score, a `ScoreLimit::Beta` flag, and the `best_move` that caused this cutoff.

Additionally, the current `depth` is stored for all scenarios. This is because a greater `depth` means a more accurate evaluation, so when we fetch from the table we need to know how deep this evaluation was generated at. For example, an evaluation at a `depth` of `20` moves is much more accurate than just `2`.

## Fetching

Fetching from the table is done once per call to `alpha_beta()`, before moves are generated and recursively searched.

If `get()` returns a matching `ScoreData` for this position, we first check that the `depth` the score was found at is greater than or equal to the current depth, for evaluation accuracy.

After checking the `depth`, we need to consider the `ScoreLimit` flag and conditionally return, which is summarized below:

```rust
// ... within alpha_beta()

let best_move = match table.get(board.zobrist()) {
    // this transposition was stored
    Some(data) => {
        // ensure that the stored data's depth is at least our current depth
        if data.depth >= depth {
            match data.flag {
                // if exact, we can always use the calculated score evaluation
                ScoreLimit::Exact => return data.score,

                // this data stores a lower-bound evaluation as a result of a beta cutoff
                // we can only return the score if it also causes a beta cutoff here
                ScoreLimit::Beta => {
                    if data.score >= beta {
                        return data.score;
                    }
                }

                // this data stores an upper-bound evaluation
                // we can only return the score if it causes an alpha adjustment here
                ScoreLimit::Alpha => {
                    if data.score <= alpha {
                        return data.score;
                    }
                }

            }
        }

        // if the depth was too low or we couldn't use the stored score, track the stored best move
        // for later on, as we pass this to the move ordering function to place it first
        data.best_move
    }

    // no data is found, so no best move could be used
    None => None,
}
```

Notice, if we don't return the fetched `data.score`, we always keep the stored `data.best_move`. This move is ordered first to trim as many branches as possible later on.
