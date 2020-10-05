const socketIo = require("socket.io");

// const socketioJwt = require("socketio-jwt");

// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const passportJwtSocketIo = require("passport-jwt.socketio");
// const validateJwtPayload = require("./utils/validateJwtPayload");

module.exports = (server, app) => {

    const io = socketIo.listen(server);

    io.on("connect", socket => {

        // socket.on( "leave", room => {
        //     console.log('leave room', room);
        //     socket.leave( room );
        // });

        // socket.emit("test", "Testing");
        // io.emit("test", "Testing");

    });

    app.set('io', io);

};