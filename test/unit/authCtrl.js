const chai = require("chai");
describe("Test test", () =>{
  it("should equal 1", (done) =>{
    chai
    .assert
    .equal(1 , 1)
    
    return done()
  })
})