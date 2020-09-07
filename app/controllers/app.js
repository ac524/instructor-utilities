const { App, Classroom } = require("../models");
const AppType = require("../models/AppType");
const appTypes  = require("../config/apps/registry.json");

module.exports = {
    async getTypes( req, res ) {

        try {

            res.json( await AppType.find({ isDisabled: false }) );

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    },
    async getSingle( req, res ) {

        try {

            res.json( await App.findOne({ room: req.roomId, type: req.params.appTypeId }).populate("type") );

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    },
    async create( req, res ) {

        try {

            const appType = await AppType.findById( req.body.type );

            const newApp = new App({
                room: req.roomId,
                type: req.body.type,
                name: appTypes[ appType.type ].name,
                data: appTypes[ appType.type ].default
            });

            await newApp.save();

            await Classroom.findByIdAndUpdate( req.roomId, { $push: { apps: appType._id } } );

            req.roomIo.emit( "dispatch", {
                type: "ADD_APP",
                payload: appType._id
            } );

            res.json({success: true});

        } catch( err ) {

            console.log(err);
            res.status(500).json({default:"Something went wrong"});

        }

    },
    async update( req, res ) {

        try {

            const update = {};

            [ "name", "data" ].forEach( prop => !req.body.hasOwnProperty(prop) || (update[prop] = req.body[prop]) );

            const app = await App.findOneAndUpdate( { room: req.roomId, type: req.params.appTypeId }, update, { new: true } ).populate("type");

            console.log( "cookies", req.cookies );

            req.roomIo.emit( `appupdate:${req.params.appTypeId}`, {
                update,
                from: req.user._id
            } );

            res.json({success: true});

        } catch( err ) {

            console.log(err);
            res.status(500).json({default:"Something went wrong"});

        }

    }
}