const setMemberContext = ({
    context
}, next) => {

    const {
        authUser: { _id },
        room: { staff }
    } = context;
    
    context.member = staff.find( member => member.user.equals( _id ) );

    if( !context.member ) throw Error('Unable to locate user\'s associated member for room');

    return next();

}

module.exports = setMemberContext;