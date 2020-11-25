const chai = require("chai");
const { authenticated, login } = require("../../app/controllers/auth");
const { User } = require("../../app/models");
const assert = require('assert');
const expect = chai.expect


describe('Auth Controller', function() {
  describe('#authenticated()', function() {
    it('should return user object', function(done) {
      const user = new User ({name: "bob"});
      
      const result = authenticated({ user });

      expect(result)
      .to.be.an("object");
      return done()
    });
  });
});