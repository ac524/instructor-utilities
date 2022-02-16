const { AuthenticationError } = require("apollo-server-express");

/**
 * @callback next
 * 
 * @typedef {import('./authentication').AuthTokenUserContext & import('./setRoomContext').RoomContext} SetMemberContext
 * 
 * @typedef MemberContext
 * @property {import('~crsmmodels/schema/MemberSchema/index').MemberDocument} member
 * 
 * @param {Object} param0 
 * @param {SetMemberContext} param0.context
 * @param {next} next 
 * @returns {*}
 */
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