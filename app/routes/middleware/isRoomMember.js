const roomIoLoader = req => req.roomIo = req.app.get("io").to(req.roomId);

module.exports = async ( req, res, next ) => {

    try {

        const staffMember = req.classroom.staff.find( member => member.user.equals(req.user._id) );

        if( !staffMember )
        
            return res.status(401).json({ default: "You are not a member of this class" });

        req.roomStaffMember = staffMember

        roomIoLoader(req);

        next();

    } catch( err ) {

        res.status(500).json({ default: "Illegal Opperation" });

    }

}