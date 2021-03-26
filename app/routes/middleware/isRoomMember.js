const { InvalidUserError } = require("../../config/errors");

const isRoomMember = async ( req, res, next ) => {

    try {

        const { staff } = req.crdata.get("room");
        const staffMember = staff.find( member => member.user.equals(req.user._id) );

        if( !staffMember ) throw new InvalidUserError( "You are not a member of this class" );

        req.crdata.set( "member", staffMember );

        next();

    } catch( err ) {

        next( err );

    }

}

module.exports = isRoomMember;