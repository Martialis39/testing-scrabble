const DICTIONARY = [
  "ADD",
  "RUN",
  "TEST",
  "OK",
  "GO",
  "FOR",
  "WHY",
  "ME"
]
const BOARD = [
  ['', 'O', 'K', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', 'R', 'U', 'N', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', '']
]

export const checkBoard = board => {
  const result = board.reduce((result, currentRow, i) => {
    const wordsFromRow = checkRow(currentRow).flatMap(e => e);
    return result.concat(wordsFromRow);
  }, [])
  return result
}

export const checkDictionary = dictionary => word => {
  if(dictionary.indexOf(word) > -1){
    return true;
  } else {
    return false;
  }
}

export const rotateBoard = board => {
  const BOARD_SIZE = board.length
  console.log(BOARD_SIZE)
  return board
    .flatMap(x => x)
    .reduce((acc, curr, index) => {
      if (acc[index % BOARD_SIZE]) {
                acc[index % BOARD_SIZE].push(curr);
              
      } else {
                acc[index % BOARD_SIZE] = [];
                acc[index % BOARD_SIZE].push(curr);
              
      }
            return acc;
          
    }, []);
}

console.log(rotateBoard(BOARD));

const isInDictionary = checkDictionary(DICTIONARY);

export const checkRow = row => {
  const { foundWords } = row.reduce((result, current, i) => {
    // One letter words are ignored
    if (current !== '') {
      result.foundLetters = result.foundLetters.concat(current.toUpperCase());
    }
    if (current === ''){
      // If empty square, the sequence of letters has broken
      // check if foundLetters is > 1 (1 letter words are ignored)
      if (result.foundLetters.length > 1){
        const word = result.foundLetters.join('');
        result.foundWords.push(word);
      }
      // either way, we clear the foundLetters
      result.foundLetters = [];
    }
    return result;
  }, {
    foundLetters: [],
    foundWords: []
  })
  return foundWords;
}
