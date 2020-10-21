const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");

// const socketioJwt = require("socketio-jwt");

// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const passportJwtSocketIo = require("passport-jwt.socketio");
// const validateJwtPayload = require("./utils/validateJwtPayload");

module.exports = (server, app) => {

    const io = socketIo.listen(server);

    io.on("connect", async (socket,a,b) => {

        // console.log(socket,a,b);

        // socket.on( "leave", room => {
        //     console.log('leave room', room);
        //     socket.leave( room );
        // });

        // socket.emit("test", "Testing");
        // io.emit("test", "Testing");

    });

    app.set('io', io);

};