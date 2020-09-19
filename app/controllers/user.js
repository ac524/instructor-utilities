const { User, Classroom, Staff } = require("../models");

module.exports = {
    async update( req, res ) {
        try {
            
            const updateList = [];

            // TODO - Email updates should not be automatic, instead there needs to be a verification process for the new email.

            ["name", "email"].forEach( key => {
                if( req.body.hasOwnProperty(key) ) updateList.push( [ key,req.body[key] ] );
            });

            if( updateList.length )

                await req.user.update( Object.fromEntries( updateList ) );

            res.json({success: true});

        } catch(err) {

            res.status(500).json({ default: "Unable to update user." });

        }
    },
    /**
     * Disassociate the currect user from a classroom.
     * - Removes the classroom ID from the user.
     * - Removes the staff entry
     * - Removes the staff reference from the classroom.
     */
    async leaveRoom( req, res ) {

        try {
            
            if( !req.user.classrooms.find( _id => _id.equals( req.params.roomId ) ) ) return res.status(404).send({ default: "That is not a classroom you belong to." });

            const member = await Staff.findOne( {
                user: req.user._id,
                classroom: req.params.roomId
            } );

            if( member.role === "instructor") return res.status(401).send({ default: "Instructors cannot leave rooms." });

            await member.remove();

            await Classroom.findByIdAndUpdate( req.params.roomId, { $pull: { staff: member._id } } );

            await req.user.update({ $pull: { classrooms: req.params.roomId } });

            res.json({success:true});

        } catch(err) {

            console.log( err );

            res.status(500).json({ default: "Unable to get user's rooms." });

        }

    },

    /**
     * Removes a room's id from all associated user docs to remove all direct associations starting from a user. The room
     * and staff are left intact,so they can later be brought back if needed.
     * - Removes the classroom ID from all known associated users.
     */
    async archiveRoom( req, res ) {

        try {
            
            if( !req.user.classrooms.find( _id => _id.equals( req.params.roomId ) ) ) return res.status(404).send({ default: "That is not a classroom you belong to." });

            const member = await Staff.findOne( {
                user: req.user._id,
                classroom: req.params.roomId
            } );

            if( member.role !== "instructor") return res.status(401).send({ default: "Only instructors can archive a room." });

            const staff = await Staff.find({ classroom: req.params.roomId }).populate("user");
            
            for(let i=0; i < staff.length; i++) await staff[i].user.update( { $pull: { classrooms: req.params.roomId } } );

            res.json({success:true});

        } catch(err) {

            console.log( err );

            res.status(500).json({ default: "Unable to get user's rooms." });

        }

    },
    async getRoomsShort( req, res ) {
        try {

            res.json(
                await Classroom
                    .find({ _id: { $in: req.user.classrooms } })
                    .populate("staff", "role user")
                    .select("name")
            );

        } catch(err) {

            res.status(500).json({ default: "Unable to get user's rooms." });

        }
    }
};