const { App, Classroom } = require("../models");
const AppType = require("../models/AppType");
const appTypes  = require("../config/apps/registry.json");
// const ioEmit = require("./utils/ioEmit");

/** CONTROLLER METHODS **/

const getTypes = async () => await AppType.find({ isDisabled: false });

const getSingle = async ({ appTypeId, roomId }) => await App.findOne({ room: roomId, type: appTypeId }).populate("type");

const create = async ({ body }) => {

    const {
        type,
        roomId,
    } = body;

    const appType = await AppType.findById( type );

    const newApp = new App({
        room: roomId,
        type,
        name: appTypes[ appType.type ].name,
        data: appTypes[ appType.type ].default
    });

    await newApp.save();

    await Classroom.findByIdAndUpdate( roomId, { $push: { apps: appType._id } } );

    // ioEmit( "dispatch", { type: "ADD_APP", payload: appType._id }, `room:${roomId}` );

}

const update = async ({ appTypeId, roomId, body }) => {

    const update = {};

    [ "name", "data" ].forEach( prop => !body.hasOwnProperty(prop) || (update[prop] = body[prop]) );

    await App.findOneAndUpdate( { room: roomId, type: appTypeId }, update, { new: true } ).populate("type");

    // ioEmit( `appupdate:${appTypeId}`, update, `room:${roomId}` );

}

module.exports = {
    getTypes,
    getSingle,
    create,
    update
}