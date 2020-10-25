const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const { Classroom } = require("../models");

const authorizeSocket = ({ handshake }) => {

    if( handshake.headers && handshake.headers.authorization )
        
        return getUserFromVerify( handshake.headers.authorization );

}

const getUserFromVerify = token => {
    try {

        return jwt.verify( token.substr(7), process.env.JWT_SECRET ).id;

    } catch {

        return false;

    }
};

const isStaffMember = async ( userId, roomId ) => {

    const room = await Classroom.findById(roomId).select("staff");

    const staffMember = room.staff.find( member => member.user.equals(userId) );

    return Boolean(staffMember);

}

class SocketDispatchLibrary {
    
    library = {};
    socket;

    constructor(socket) {
        this.socket = socket;
    }

    generate(room) {
        this.library[room] = dispatch => this.socket.to(room).emit('dispatch', dispatch);
        return this;
    }

    has(room) {
        return this.library.hasOwnProperty(room);
    }

    get(room) {
        return this.library[room];
    }

}

module.exports = (server, app) => {

    const io = socketIo.listen(server);

    io.on("connect", socket => {

        const dispatchLib = new SocketDispatchLibrary(socket);

        let socketUserId = authorizeSocket(socket);

        socket.on("authorize", bearerToken => {

            socketUserId = getUserFromVerify(bearerToken);

        });

        socket.on("join:room", async roomId => {
            
            if( socketUserId && await isStaffMember( socketUserId, roomId ) ) {

                const socketRoom = `room:${roomId}`;
                
                socket.join( socketRoom );

                if(!dispatchLib.has( socketRoom )) dispatchLib.generate( socketRoom );

                socket.on(`${roomId}:dispatch`, dispatchLib.get( socketRoom ) );

            }
          
        });

        socket.on("leave:room", roomId => {

            socket.leave( `room:${roomId}` );

            if(dispatchLib.has( roomId )) socket.off(`${roomId}:dispatch`, dispatchLib.get( socketRoom ) );

        });

    });

    app.set( 'io', io );

};