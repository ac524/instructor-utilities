module.exports = (req, io, action, payload, force = false) => {
    console.log(action);
    // console.log(io);
    // req.app.get("io").to(`room/5f6d854577c44b65a255d694`).emit( action, {
    req.app.get("io").emit("rockfish:fish", {test:"test"});
    // req.app.get("io").emit( action, {
    // // // io.emit( action, {
    //     payload,
    //     from: req.userSocket && req.userSocket.id,
    //     force
    // } );
}