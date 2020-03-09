const chai = require("chai")
const sinon = require("sinon")
const expect = chai.expect;

const checkBoard = x => x;

describe("Check board function", function(){
  describe("Empty board", function(){
    it("should return an empty array", function(){
      const emptyBoard = [];
      const result = checkBoard(emptyBoard);
      expect(result).to.deep.equal([]);
    })
  })
})


