const socketIo = require('socket.io');

module.exports = (server, app) => {

    const io = socketIo.listen(server);

    const classrooms = io.of(/^\/\w+$/);

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