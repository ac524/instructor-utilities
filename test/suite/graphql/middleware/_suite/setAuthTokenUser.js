const { expect } = require("chai");
const { stub } = require("sinon");

const { AuthenticationError } = require("apollo-server-express");

const { setAuthTokenUser } = require("~crsm/graphql/middleware/authentication");

const makeDb = () => {
    const db = new Map();

    db.set('user', {
        findOne: stub().callsFake(({ docId }) => docId === 'AValidUserID' ? 'userFindOneResult' : false )
    });

    return db;
}
module.exports = function() {

    it("should add `authUser` to `context` if provided a valid user id", async () => {

      const context = {
        authTokenData: { id: "AValidUserID" },
        db: makeDb()
      }

      await setAuthTokenUser( { context }, () => {} );

      // Assert - Expect a result.
      expect( "authUser" in context ).to.equal( true );

    });

    it("should add assign the result of the user model `findOne` to `context.authUser`", async () => {

        const context = {
          authTokenData: { id: "AValidUserID" },
          db: makeDb()
        }

        await setAuthTokenUser( { context }, () => {} );
  
        // Assert - Expect a result.
        expect( context.authUser ).to.equal( "userFindOneResult" );
  
    });

    /** EXCEPTION TESTS **/

    it("should throw an `AuthenticationError` if not provided `authTokenData.id` in context", async () => {

      // Arrange
      const context = {};

      // Act
      const promise = setAuthTokenUser( { context }, () => {} );

      // Assert - Expect a result.
      expect( promise ).to.be.rejectedWith( new AuthenticationError("Invalid Authorization") );

    });

    it("should throw an `AuthenticationError` if not provided a valid user id in context", async () => {

      // Arrange
      const context = {
        authTokenData: { id: "InvalidUserID" },
        db: makeDb()
      }

      // Act
      const promise = setAuthTokenUser( { context }, () => {} );

      // Assert - Expect a result.
      expect( promise ).to.be.rejectedWith( new AuthenticationError("Invalid Authorization") );

    });

};