const { InvalidDataError } = require("../../config/errors");

const createCheckPermission = permission => ( req, res, next ) => {

    const member = req.crdata.get( "member" );

    if( ! member )
    
        return next( new InvalidDataError( "Expected a member to validate permissions, but got none." ) );

    if( ! member.isAllowedTo( permission ) )

        return next( new InvalidDataError( `You are not allowed to ${permission}.` ) );

    next();

}

module.exports = createCheckPermission;