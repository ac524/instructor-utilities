module.exports = (req, res, next) => {

    const socketId = req.header("User-Socket-Id");

    req.userSocket = socketId
    
        ? req.app.get("io").sockets.connected[socketId]

        : false;

    next();

}