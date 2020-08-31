const socketIo = require('socket.io');

module.exports = (server) => {

    const io = socketIo.listen(server);

    // const classrooms = io.of(/^\/\w+$/);

    io.on('connection', socket => {
    
        console.log( socket.nsp.name );
    
        // socket.join( socket.nsp.name.substr(1) )
    
        socket.emit("FromAPI", "Test");
    
    //   client.on('event', data => { /* … */ });
    //   client.on('disconnect', () => { /* … */ });
    
    });

    return io;

};