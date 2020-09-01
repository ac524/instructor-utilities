const socketIo = require("socket.io");
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const passportJwtSocketIo = require("passport-jwt.socketio");
// const validateJwtPayload = require("./utils/validateJwtPayload");

module.exports = (server, app) => {

    const io = socketIo.listen(server);

    // set the passport-jwt options
    // const passportOptions = {
    //     jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    //     secretOrKey: process.env.PASSPORT_SECRET
    // }

    // function verify(jwtPayload, done) {
    //     // token is valid 
    //     // we still can verify the token
        
    //     // the user passed is set to socket.request.user
    //     done(null, jwtPayload)
    // }

    const classrooms = io.of(/^\/\w+$/);

    // set the authorization middleware
    // classrooms.use(passportJwtSocketIo.authorize(passportOptions, verify));

    classrooms.on('connection', socket => {
    
        // console.log( socket.nsp.name );
    
        socket.join( socket.nsp.name.substr(1) );
    
        socket.emit("FromAPI", "Test");
    
    //   client.on('event', data => { /* … */ });
    //   client.on('disconnect', () => { /* … */ });
    
    });

    app.set('io', io);
    app.set('classroomIo', classrooms);

};