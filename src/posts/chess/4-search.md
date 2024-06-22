---
title: 'Tree Searching'
date: '2024-06-22'
summary: 'Position tree searching using the alpha-beta algorithm, quiesence search, and transposition tables'
---

Given unlimited time, finding the best move in any position would be done by checking down every possible tree of positions, where moves are continuously made until the game is either decided in a win, loss, or draw.

Sadly, this is just not possible due to how quickly the number of calculations grows. Since the the number of positions to consider grows exponentially, these calculations quickly become unmanageable. After getting to a depth of just 10 half-moves, we are looking at about 70 trillion positions. After 15, this becomes 2 sextillion, or 2 \* 10<sup>21</sup>.

So to make an engine that is useful, we need to heavily trim down on these calculations. Some options we have are:

-   Estimate the strength of a position
    -   We have implemented this in [the previous section](/blog/chess/evaluation), where we went over an `evaluation()` function.
-   Speed up the searching through the tree
    -   We will implement the [alpha-beta search](https://www.chessprogramming.org/Alpha-Beta) algorithm, which uses some logic to trim extra branches.

# Alpha-Beta Search

## Depth-First Search

Before we get into alpha-beta, we must first understand depth-first search, or DFS, which is a general searching algorithm.

In the context of our chess engine, it starts at the position we are in, and searches through every possible move up to a certain `depth`. After reaching the max depth, the strength of the position is estimated using `evaluate()`. As we go, we store the best move found and return that best move after searching through all options.

Logically, we can think of what is going on as follows, say `White` is to move:

-   `White` wants to make a move, so we consider `Black`'s best move in response to each move.
-   `Black` will then want to make a best move, considering `White`'s best move in response to each move.
-   ...continue on until we reach the max depth.
-   After we have searched deep enough, the strength of a position is determined by running `evaluate()`.

```rust
type Score = u32;

fn dfs(&mut board: Board, depth: u8) -> Score {
    // base case: at max depth, evaluate position
    if depth == 0 {
        return evaluate(board);
    }

    let mut best = Score::MIN;

    // recursively search and choose the best option
    for mov in board.generate_moves() {
        board.make_move(mov);

        // negate score, because evaluation is relative to moving color
        // however good/bad the opponent's evaluation is must be reversed for us
        let score = -dfs(board, depth - 1);

        // update best move so far
        best = best.max(score);

        board.unmake_move(mov);
    }

    best
}
```

Graphically, it looks something like this:

```
TODO
```

## Branch Trimming

Now, we move onto the alpha-beta search algorithm, which is a DFS improvement that removes branches deemed too good or too bad.

It is easiest to understand alpha-beta by going through an example first:

-   Say we are `White` and looking for a move to make. We check through the entire subtree for our first move, `move_a`, and determine that this would lead to an even position.
-   Moving onto the second option, `move_b`, while checking through `Black`'s responses to this, we find that `Black` could take a piece of ours and be at an advantage.
-   Having this knowledge, we can just completely forget about the rest of the search tree for `move_b`, because by making this move, `Black` would definitely be at an advantage. We would always just choose `move_a` over `move_b`.

To allow for this kind of pruning, we keep a lower bound, `alpha`, which is updated as we go and used to trim branches that would be too bad for us.

We must also keep an upper bound, `beta`, which is be used to trim branches that are too good that the opponent wouldn't allow the move to even be made. Think of the opponent's view, where if they see we can make a great move leading to a worse position than their lower bound, they would trim it anyways.

Both `alpha` and `beta` are swapped with as we travel down the move tree, as one color's upper bound corresponds to the other color's lower bound.

Let's compare the plain DFS tree to an improved alpha-beta tree:

```
TODO
```

Also, here's a snippet summarizing the alpha-beta algorithm:

```rust
def alpha_beta(board: &mut Board, mut alpha: Score, beta: Score, depth: u8) -> Score {
    if depth == 0 {
        return evaluate(board);
    }

    for mov in board.generate_moves() {
        // same here as before
        board.make_move(mov);

        // same idea, reverse evaluation for opponent
        // also use negated alpha/beta but reversed
        let score = -alpha_beta(board, -beta, -alpha depth - 1);

        board.unmake_move(mov);

        // if this move is better than opponent's best move,
        // this will be trimmed later on, might as well do it now
        if score >= beta {
            return beta;
        }

        // update current best move
        alpha = alpha.max(score);
    }

    // return our best case score value
    alpha
}
```
