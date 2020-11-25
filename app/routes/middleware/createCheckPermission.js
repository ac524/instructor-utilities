const { InvalidDataError } = require("../../config/errors");

const createCheckPermission = (target, permission) => ( req, res, next ) => {

    if( ! req.crdata.has( target ) )
    
        return next( new InvalidDataError( `Exected a ${target} to validate permissions, but got none.` ) );

    // TODO This is built expecting the "staffMember" target. May need more work to safely account for other options.
    if( !req.crdata.get( target ).isAllowedTo( permission ) )

        return next( new InvalidDataError( `You are not allowed to ${permission}.` ) );

    next();

}

module.exports = createCheckPermission;