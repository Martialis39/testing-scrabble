const chai = require("chai")
const sinon = require("sinon")
const expect = chai.expect;

import { newBoard, checkDictionary, parseBoard } from '../main'

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

describe("checkDictionary function", function(){
  it('should return true if input is included in dictionary', function(){
    const input = 'Test'
    const dictionary = ['Test']
    expect(checkDictionary(input, dictionary)).to.equal(true);
  })
  it('should return false if input is not included in dictionary', function(){
    const input = 'test'
    const dictionary = ['something']
    expect(checkDictionary(input, dictionary)).to.equal(false);
  })
  it('should ignore case', function(){
    const input = 'TeSt'
    const dictionary = ['teST']
    expect(checkDictionary(input, dictionary)).to.equal(true);
  })
});

// describe("parseWord function", function(){
//   it("should return a word", function(){

//   });
// })

describe("parseBoard function", function(){
  it('should return all words on the board', function(){
    const dictionary = ['red', 'ok']
    const board = [
      ['R', 'E', 'D', '', 'O', 'K'],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]
    expect(parseBoard(board, dictionary)).to.deep.equal(['RED', 'OK']);
  })
});

