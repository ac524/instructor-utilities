const { expect } = require("chai");
const { stub } = require("sinon");

const { AuthenticationError } = require("apollo-server-express");

const { setAuthTokenUser } = require("~crsm/graphql/middleware/authentication");

const makeDb = (customDb = {}) => {
    const db = new Map();

    db.set('user', {
        findOne: stub().callsFake(() => 'userFindOneResult' ),
        ...customDb
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

    it("should call the user model `findOne` with the provided user id as `docId` and select `name isVerified classrooms`", async () => {

      const docId = "AValidUserID";
      const context = {
        authTokenData: { id: docId },
        db: makeDb()
      }

      await setAuthTokenUser( { context }, () => {} );

      const userModel = context.db.get('user');

      // Assert - Expect a result.
      expect( userModel.findOne )
        .to.have.been
        .calledWith(
          { docId },
          { select: "name isVerified classrooms" }
        );

    });

    it("should call the `next` method if a valid user id is provided", async () => {

      const docId = "AValidUserID";
      const context = {
        authTokenData: { id: docId },
        db: makeDb()
      }
      const next = stub();

      await setAuthTokenUser( { context }, next );

      // Assert - Expect a result.
      expect( 'authUser' in context ).to.be.true;
      expect( next ).to.have.been.called;

    });

    /** EXCEPTION TESTS **/

    describe('Exceptions', () => {

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
          db: makeDb({
            findOne: stub()
          })
        }
  
        // Act
        const promise = setAuthTokenUser( { context }, () => {} );
  
        // Assert - Expect a result.
        expect( promise ).to.be.rejectedWith( new AuthenticationError("Invalid Authorization") );
  
      });
  
      it("should throw an `AuthenticationError` if the user model `findOne` method throws an error", async () => {
  
        // Arrange
        const context = {
          authTokenData: { id: "UserId" },
          db: makeDb({
            findOne: () => { throw Error('Any') }
          })
        }
  
        // Act
        const promise = setAuthTokenUser( { context }, () => {} );
  
        // Assert - Expect a result.
        expect( promise ).to.be.rejectedWith( new AuthenticationError("Invalid Authorization") );
  
      });

    });

};