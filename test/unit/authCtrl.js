const chai = require("chai");
const { authenticated, login } = require("../../app/controllers/auth");
const { User } = require("../../app/models");
const assert = require('assert');
const expect = require('expect');


describe('Auth Controller', function() {
  describe('#authenticated()', function() {
    it('should return user object', function() {
     const user = new User ({name: "bob"})
      
      .
    });
  });
});