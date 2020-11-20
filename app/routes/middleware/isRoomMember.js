const { InvalidUserError } = require("../../config/errors");

module.exports = async ( req, res, next ) => {

    try {

        const { staff } = req.crdata.get("classroom");
        const staffMember = staff.find( member => member.user.equals(req.user._id) );

        if( !staffMember ) throw new InvalidUserError( "You are not a member of this class" );

        req.crdata.set("staffMember", staffMember);

        next();

    } catch( err ) {

        next( err );

    }

}