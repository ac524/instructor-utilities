const useDescribe = require("~crsmtest/lib/useDescribe");

const setAuthTokenUser = require("./_suite/authentication.setAuthTokenUser");
const requireVerifiedUser = require("./_suite/authentication.requireVerifiedUser");

const describe = useDescribe(this);

describe("/middleware", function() {

    const describe = useDescribe(this);

    
    describe( 'authentication', () => {

        describe( 'setAuthTokenUser', setAuthTokenUser );

        describe( 'requireVerifiedUser', requireVerifiedUser );

    } );

});