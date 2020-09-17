const { Classroom } = require("../models");

module.exports = {
    async roomNames( req, res ) {
        try {

            res.json( await Classroom.find({ _id: { $in: req.user.classrooms } }).select("name") );

        } catch(err) {

            res.status(500).json({ default: "Unable to create student." });

        }
    }
};