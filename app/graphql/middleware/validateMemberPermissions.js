const { AuthenticationError } = require("apollo-server-express");

const validateMemberPermissions = ({
    context: {
        member,
        permission
    }
}, next) => {

    console.log( member );
    console.log( permission );

    if( !member.isAllowedTo( permission ) )

        throw new AuthenticationError( `You are not allowed to ${permission}.` );

    return next();

}

module.exports = validateMemberPermissions;