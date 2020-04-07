# Rules of Srabble

Game is played on a NxN board.
A valid word is a word found in the official dictionary and at least 2 chars long.
Valid words can be spelled from top to bottom and/or left to right.
All connected tiles (letters) must form valid words.
Tiles have points associated with them.
A word is worth the sum of points that its tiles are worth.
Players get points for each valid word added to the board.

Ideas on where to continue (by Reimo).

Scoring:
* Get new words on board, after a valid move
* For each word, calculate how many points it is worth
* Each tile has an associated score value

Game loop:
* Tiles (a global pool of tiles, players can take new tiles from pool)
* Players (each player has a score, each player has a set of tiles to place
  on board)
* Turns (players can't move simultaneously, players can move one
  after another)
* Game start (resetting game state)
* Game end (game ends when a) no more valid moves, b) out of tiles, c) no
  player has made a valid move for 3 turns (not sure about the last one))

Session 31/03/2020

During this session, we worked on implementing scoring. First, we implemented a function
`scoreWord` that takes in a word and a mapping of letters and points and returns the point
value of the input word. We also laid the foundation for adding score multipliers, by modifying
the parseBoard function. Instead of returning an array of words (strings), it now returns an
array of objects, that have a `word` key and additional information about its placement on the board.

