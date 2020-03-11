const DICTIONARY = [
  "ADD",
  "RUN",
  "TEST",
  "OK",
  "GO",
  "FOR",
  "WHY",
  "ME",
  "DO",
  "NOT",
  "WIN",
  "WALK",
  "TABLE",
  "GLASS",
  "WINE",
  "BEER",
  "FINE"
]

const BOARD = [
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '']
]

export const newBoard = (size) => {
  return Array(size).fill(Array(size).fill(''))
}

export const checkDictionary = (input, dictionary) => {
  return dictionary.map(e => e.toLowerCase()).includes(input.toLowerCase())
}

// []

export const parseBoard = (board, dictionary) => {
  console.warn('DEBUG:: board is ', board);
  let words = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if(board[i][j] !== ''){
        // Check if on edge OR if prevous element is empty
        if(j === 0 || board[i][j-1] === ''){
          if(j < board.length - 1 && board[i][j + 1] !== ''){
            // We have the beginning of a new word
            let word = board[i][j];
            // Lets keep going until we find an empty tile or the edge
            for (let k = j + 1; k < board.length; k++) {
              if(board[i][k] !== ''){
                word = word.concat(board[i][k])
              } else {
                break
              }
            }
            words.push(word)
          }
        }
      }
    }
  }
  return words
}
