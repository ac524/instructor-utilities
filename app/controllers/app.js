const { App, Room } = require("../models");
const AppType = require("../models/AppType");
const appTypes  = require("../config/apps/registry.json");
// const ioEmit = require("./utils/ioEmit");

/** CONTROLLER METHODS **/

const getTypes = async () => await AppType.find({ isDisabled: false });

const getSingle = async ({ appTypeId, roomId }) => await App.findOne({ room: roomId, type: appTypeId }).populate("type");

const create = async ({ appData }) => {

    const {
        type,
        roomId,
    } = appData;

    const appType = await AppType.findById( type );

    const newApp = new App({
        room: roomId,
        type,
        name: appTypes[ appType.type ].name,
        data: appTypes[ appType.type ].default
    });

    await newApp.save();

    await Room.findByIdAndUpdate( roomId, { $push: { apps: appType._id } } );

    // ioEmit( "dispatch", { type: "ADD_APP", payload: appType._id }, `room:${roomId}` );

}

const update = async ({ appTypeId, roomId, appData }) => {

    const update = {};

    [ "name", "data" ].forEach( prop => !appData.hasOwnProperty(prop) || (update[prop] = appData[prop]) );

    await App.findOneAndUpdate( { room: roomId, type: appTypeId }, update, { new: true } ).populate("type");

    // ioEmit( `appupdate:${appTypeId}`, update, `room:${roomId}` );

}

module.exports = {
    getTypes,
    getSingle,
    create,
    update
}