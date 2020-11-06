const { User, Classroom } = require("../models");
const ioEmit = require("./utils/ioEmit");
const passwordHash = require('../config/utils/passwordHash');
const validateRegisterInput = require("../config/validation/register");


module.exports = {
    async update(req, res) {
        try {

            const bodyKeys = Object.keys( req.body );
            const excludeFilters = ["name", "email", "password", "roomname", "code"].filter( filter => !bodyKeys.includes(filter) );
            const { errors, isValid } = validateRegisterInput( req.body, excludeFilters );

            // Check validation
            if (!isValid)

                return res.status(400).json( errors );
            
            const updateList = [];

            // TODO - Email updates should not be automatic, instead there needs to be a verification process for the new email.

            ["name", "email"].forEach(key => {
                if (req.body.hasOwnProperty(key)) updateList.push([key, req.body[key]]);
            });

            if (req.body.password) updateList.push(["password", await passwordHash(req.body.password)]);

            if (updateList.length) await req.user.update(Object.fromEntries(updateList));

            res.json({ success: true });

        } catch (err) {

            res.status(500).json({ default: "Unable to update user." });

        }
    },
    /**
     * Disassociate the currect user from a classroom.
     * - Removes the classroom ID from the user.
     * - Removes the staff entry
     * - Removes the staff reference from the classroom.
     */
    async leaveRoom(req, res) {

        try {

            if (req.roomStaffMember.role === "instructor") return res.status(401).send({ default: "Instructors cannot leave rooms." });

            const memberId = req.roomStaffMember._id;

            await req.roomStaffMember.remove();

            await req.classroom.save();

            await req.user.update({ $pull: { classrooms: req.roomId } });

            ioEmit(req, "dispatch", { type: "REMOVE_STAFF", payload: memberId }, `room:${req.roomId}`);

            res.json({ success: true });

        } catch (err) {

            res.status(500).json({ default: "Unable to get user's rooms." });

        }

    },

    /**
     * Removes a room's id from all associated user docs to remove all direct associations starting from a user. The room
     * and staff are left intact,so they can later be brought back if needed.
     * - Removes the classroom ID from all known associated users.
     */
    async archiveRoom(req, res) {

        try {

            if (req.roomStaffMember.role !== "instructor") return res.status(401).send({ default: "Only instructors can archive a room." });

            const staffUserIds = req.classroom.staff.map(({ user }) => user);

            await User.updateMany({ _id: { $in: staffUserIds } }, { $pull: { classrooms: req.roomId } });

            res.json({ success: true });

        } catch (err) {

            console.log(err);

            res.status(500).json({ default: "Unable to get user's rooms." });
        }

    },

    async getRoomsShort(req, res) {
        try {

            res.json(
                await Classroom
                    .find({ _id: { $in: req.user.classrooms } })
                    .select("name staff.role staff.user")
            );

        } catch (err) {

            res.status(500).json({ default: "Unable to get user's rooms." });
        }
    }
};