
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

export const checkWordInDictionary = (input, dictionary) => {
  return dictionary.map(e => e.toLowerCase()).includes(input.toLowerCase())
}

export const checkWordsInDictionary = (words, dictionary) => {
  for (let i = 0; i < words.length; i++) {
    if (!checkWordInDictionary(words[i].word, dictionary)) {
      return false
    }
  }

  return true
}

export const parseBoard = (board) => {
  console.warn('DEBUG:: board is ', board);
  let words = [];
  for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
    for (let columnIdx = 0; columnIdx < board.length; columnIdx++) {
      if (board[rowIdx][columnIdx] !== '') {
        // Check if on row edge OR if previous element is empty
        if (columnIdx === 0 || board[rowIdx][columnIdx - 1] === '') {
          if (columnIdx < board.length - 1 && board[rowIdx][columnIdx + 1] !== '') {
            // We have the beginning of a new word
            const newWord = extractWordInRow(board, rowIdx, columnIdx)
            words.push({word: newWord, start: {x: columnIdx, y: rowIdx }, direction: 'horizontal'})
          }
        }

        // Check if on column edge OR if previous element is empty
        if (rowIdx === 0 || board[rowIdx - 1][columnIdx] === '') {
          if (rowIdx < board.length - 1 && board[rowIdx + 1][columnIdx] !== '') {
            // We have the beginning of a new word
            const newWord = extractWordInColumn(board, columnIdx, rowIdx)
            words.push({word: newWord, start: {x: columnIdx, y: rowIdx }, direction: 'vertical'})
          }
        }
      }
    }
  }
  return words
}

export const formatWord = (word, startX, startY, direction) => {
  return {
    word,
    direction,
    start: {
      x: startX,
      y: startY
    }
  }
}

export const checkMove = (board, dictionary) => {
  const wordsOnBoard = parseBoard(board)

  if (wordsOnBoard.length == 0) {
    return false
  }

  return checkWordsInDictionary(wordsOnBoard, dictionary)
}

const extractWordInRow = (board, rowIdx, startIdx) => {
  let word = board[rowIdx][startIdx];
  // Lets keep going until we find an empty tile or the edge
  for (let k = startIdx + 1; k < board.length; k++) {
    if (board[rowIdx][k] !== '') {
      word = word.concat(board[rowIdx][k])
    } else {
      break
    }
  }
  return word
}

const extractWordInColumn = (board, columnIdx, startIdx) => {
  let word = board[startIdx][columnIdx];
  // Lets keep going until we find an empty tile or the edge
  for (let k = startIdx + 1; k < board.length; k++) {
    if (board[k][columnIdx] !== '') {
      word = word.concat(board[k][columnIdx])
    } else {
      break
    }
  }
  return word
}

export const scoreWord = (word, letterValues) => {
  let result = 0;
  for(let letter of word){
    result += letterValues[letter.toLowerCase()]
  }
  return result;
}

export const scoreBoard = (words, letterMultipliers, wordMultipliers, letterValues) => {
  return words.reduce((score, {word, start, direction}) => {
    let currentX = start.x;
    let currentY = start.y;
    const wordMultipliersToApply = []
    const wordScore = Array.from(word).reduce((sumOfLetters, letter, index) => {
      let baseValue = letterValues[letter]
      if (direction === 'horizontal') {
        currentX += index
      } else if (direction === 'vertical') {
        currentY += index
      }
      const letterMultiplier = letterMultipliers[`${currentX}:${currentY}`]
      if (letterMultiplier) {
        baseValue *= letterMultiplier
      }
      return sumOfLetters += baseValue;
    }, 0)
    return score += wordScore
  }, 0)
}

