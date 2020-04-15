
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
    let wordMultipliersToApply = 1; 
    const wordScore = Array.from(word).reduce((sumOfLetters, letter, index) => {
      let baseValue = letterValues[letter]
      if (direction === 'horizontal') {
        currentX += index
      } else if (direction === 'vertical') {
        currentY += index
      }
      const letterMultiplier = letterMultipliers[`${currentX}:${currentY}`]
      const wordMultiplier = wordMultipliers[`${currentX}:${currentY}`]
      if (letterMultiplier) {
        baseValue *= letterMultiplier
      }
      if (wordMultiplier) {
        wordMultipliersToApply *= wordMultiplier
      }
      return sumOfLetters += baseValue;
    }, 0)
    return score += wordScore * wordMultipliersToApply
  }, 0)
}

const checkCoordinateOnBoard = (coordinate, boardLength) => {
  if(coordinate.x < 0 || coordinate.y < 0){
    return false
  }
  if(coordinate.x > boardLength || coordinate.y > boardLength){
    return false
  }
  return true;
}

const getEndOfWordCoordinate = (word, start, direction) => {
  if(direction === 'horizontal'){
    return {x: start.x + word.length, y: start.y}
  } else {
    return {x: start.x, y: start.y + word.length}
  }
} 

export const addLetters = ({word, start, direction}, board) => {
  const startingTile = direction == 'horizontal' ? start.x : start.x  
  if (!checkCoordinateOnBoard(start, board[0].length) ||!checkCoordinateOnBoard(getEndOfWordCoordinate(word, start, direction), board[0].length)){
    return false
  }

  const newBoard = JSON.parse(JSON.stringify(board));

  if(direction === 'horizontal'){
    for(let i = 0; i < word.length; i++){
      newBoard[start.y][start.x + i] = word[i]
    }
  } else {
    for(let i = 0; i < word.length; i++){
      newBoard[start.y + i][start.x] = word[i]
    }
  }
  return newBoard
}
