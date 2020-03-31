const chai = require("chai")
const sinon = require("sinon")
const expect = chai.expect;

import { newBoard, checkWordInDictionary, checkMove, parseBoard } from '../main'

describe("newBoard function", function(){
  describe("returns board", function(){
    // it("should return an empty array", function(){
    //   const emptyBoard = [];
    //   const result = checkBoard(emptyBoard);
    //   expect(result).to.deep.equal([]);
    // })
    it('should return an empty NxN board', function(){
      const size = 3;
      const result = [
        [ "", "", ""],
        [ "", "", ""],
        [ "", "", ""],
      ]
      expect(newBoard(size)).to.deep.equal(result);
    })

  });

})

describe("checkWordInDictionary function", function(){
  it('should return true if input is included in dictionary', function(){
    const input = 'Test'
    const dictionary = ['Test']
    expect(checkWordInDictionary(input, dictionary)).to.equal(true);
  })
  it('should return false if input is not included in dictionary', function(){
    const input = 'test'
    const dictionary = ['something']
    expect(checkWordInDictionary(input, dictionary)).to.equal(false);
  })
  it('should ignore case', function(){
    const input = 'TeSt'
    const dictionary = ['teST']
    expect(checkWordInDictionary(input, dictionary)).to.equal(true);
  })
});

describe("parseBoard function", function(){
  it('should return all words in the rows', function(){
    const dictionary = ['red', 'ok']
    const board = [
      ['R', 'E', 'D', '', '', ''],
      ['', '', '', '', 'O', 'K'],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]
    expect(parseBoard(board, dictionary)).to.deep.equal(['RED', 'OK']);
  })
  it('should return all words in the columns', function(){
    const dictionary = ['red', 'ok']
    const board = [
      ['R', '', '', '', '', ''],
      ['E', '', '', '', '', ''],
      ['D', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', 'O', '', '', '', ''],
      ['', 'K', '', '', '', ''],
    ]
    expect(parseBoard(board, dictionary)).to.deep.equal(['RED', 'OK']);
  })
  it('should return all words in the columns', function(){
    const dictionary = ['red', 'ok']
    const board = [
      ['', '', '', '', '', ''],
      ['', 'A', 'B', 'C', '', ''],
      ['', 'D', 'E', 'F', '', ''],
      ['', 'G', 'H', 'I', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]
    expect(parseBoard(board, dictionary)).to.deep.equal(['ABC', 'ADG', 'BEH', 'CFI', 'DEF', 'GHI']);
  })
  it('should return all words in the columns', function(){
    const dictionary = ['red', 'ok']
    const board = [
      ['A', '', '', '', '', 'A'],
      ['B', '', '', '', '', 'B'],
      ['C', '', '', '', '', 'C'],
      ['D', '', '', '', '', 'D'],
      ['E', '', '', '', '', 'E'],
      ['F', '', '', '', '', 'F'],
    ]
    expect(parseBoard(board, dictionary)).to.deep.equal(['ABCDEF', 'ABCDEF']);
  })
});

describe("checkMove function", function(){
  it('returns true if all found words are in dictionary', function(){
    const dictionary = ['red', 'ok']
    const board = [
      ['', '', 'R', 'E', 'D', ''],
      ['', '', '', '', '', ''],
      ['', 'O', '', '', '', ''],
      ['', 'K', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]
    expect(checkMove(board, dictionary)).to.deep.equal(true);
  })
  it('returns false if board is empty', function(){
    const dictionary = ['red', 'ok']
    const board = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]
    expect(checkMove(board, dictionary)).to.deep.equal(false);
  })
  it('returns false if dictionary is empty', function(){
    const dictionary = []
    const board = [
      ['', '', 'R', 'E', 'D', ''],
      ['', '', '', '', '', ''],
      ['', 'O', '', '', '', ''],
      ['', 'K', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]
    expect(checkMove(board, dictionary)).to.deep.equal(false);
  })
  it('returns false if some words are missing from dictionary', function(){
    const dictionary = ['red']
    const board = [
      ['', '', 'R', 'E', 'D', ''],
      ['', '', '', '', '', ''],
      ['', 'O', '', '', '', ''],
      ['', 'K', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]
    expect(checkMove(board, dictionary)).to.deep.equal(false);
  })
})
