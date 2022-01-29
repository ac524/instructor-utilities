const useDescribe = require("~crsmtest/lib/useDescribe");

const setAuthTokenUser = require("./_suite/setAuthTokenUser");

const describe = useDescribe(this);

describe("/middleware", function() {

    const describe = useDescribe(this);

    describe( 'setAuthTokenUser', setAuthTokenUser );

});