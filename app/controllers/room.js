const { Classroom } = require("../models");

module.exports = {
    async getSingle( req, res ) {

        try {

            const room =
                await Classroom.findById( req.roomId )
                    .populate("staff.user", "name email date")
                    .populate("invites.token");

            const roomAgg = await room.getFeedAggregate();

            // if( req.userSocket ) req.userSocket.join( `room:${room._id}` );

            res.json( roomAgg );

        } catch( err ) {

            console.log( err );

            res.status(500).json({default:"Something went wrong"});

        }

    },
    async update( req, res ) {

        try {

            if( req.roomStaffMember.role !== "instructor" ) return res.status(401).json({default:"You must be an instructor to update the class."});

            const updateList = [];

            // TODO - Email updates should not be automatic, instead there needs to be a verification process for the new email.

            ["name"].forEach( key => {
                if( req.body.hasOwnProperty(key) ) updateList.push( [ key,req.body[key] ] );
            });

            if( updateList.length )

                await Classroom.findByIdAndUpdate( req.roomId, Object.fromEntries( updateList ) );

            res.json({success:true});

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    }
}