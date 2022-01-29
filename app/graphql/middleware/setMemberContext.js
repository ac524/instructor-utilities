const { AuthenticationError } = require("apollo-server-express");

const setMemberContext = ({
    context
}, next) => {

    const {
        authUser: { _id },
        room: { staff }
    } = context;
    
    context.member = staff.find( member => member.user.equals( _id ) );

    if( !context.member ) throw AuthenticationError('User is not a member of the associated room.');

    return next();

}

module.exports = setMemberContext;