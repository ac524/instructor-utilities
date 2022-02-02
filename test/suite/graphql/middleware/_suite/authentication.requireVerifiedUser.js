const { expect } = require("chai");
const { stub } = require("sinon");

const { AuthenticationError } = require("apollo-server-express");

const { requireVerifiedUser } = require("~crsm/graphql/middleware/authentication");

module.exports = function() {
    it("should call the `next` method if provided a truthy value for `authUser.isVerified` in `context`", async () => {
        
        const context = {
            authUser: { isVerified: true }
        }

        const next = stub();

        requireVerifiedUser( { context }, next )

        expect( next ).to.have.been.called;

    });

    /** EXCEPTION TESTS **/

    describe('Exceptions', () => {

        it("should throw an `AuthenticationError` if provided a falsy value for `authUser.isVerified` in `context`", async () => {

            const context = {
                authUser: { isVerified: false }
            }

            const act = () => requireVerifiedUser( { context }, () => {} );
    
            expect( act ).to.throw( AuthenticationError, "User is not verified" );

        });

        it("should throw an `AuthenticationError` if not provided a value for `authUser.isVerified` in `context`", async () => {

            const context = {}

            const act = () => requireVerifiedUser( { context }, () => {} );
    
            expect( act ).to.throw( AuthenticationError, "User is not verified" );

        });

    });
}