const { expect } = require("chai");
const { stub } = require("sinon");

const { setAuthTokenUser } = require("~crsm/graphql/middleware/authentication");

const makeDb = () => {
    const db = new Map();

    db.set('user', {
        findOne: stub().callsFake(() => 'userFindOneResult')
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

};