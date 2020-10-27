const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const { Classroom, Feed } = require("../models");

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

const isFeedMember = async ( userId, feedId ) => isStaffMember( userId, (await Feed.findById( feedId ).select( "room" )).room );

class SocketDispatchLibrary {
    
    library = {};
    socket;

    constructor(socket) {
        this.socket = socket;
    }

    generate(room,action) {
        this.library[room] = dispatch => this.socket.to(room).emit(action, dispatch);
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

                if(!dispatchLib.has( socketRoom )) dispatchLib.generate( socketRoom, "dispatch" );

                socket.on(`${roomId}:dispatch`, dispatchLib.get( socketRoom ) );

            }
          
        });

        socket.on("leave:room", roomId => {

            const socketRoom = `room:${roomId}`;

            socket.leave( socketRoom );

            if(dispatchLib.has( socketRoom )) socket.off(`${roomId}:dispatch`, dispatchLib.get( socketRoom ) );

        });

        socket.on("join:feed", async feedId => {
            
            if( socketUserId && await isFeedMember( socketUserId, feedId ) ) {

                const feedRoom = `feed:${feedId}`;
                
                socket.join( feedRoom );

                if(!dispatchLib.has( feedRoom )) dispatchLib.generate( feedRoom, "feedpush" );

                socket.on(`${feedId}:push`, dispatchLib.get( feedRoom ) );

            }
          
        });

        socket.on("leave:feed", feedId => {

            const feedRoom = `feed:${feedId}`;

            socket.leave( feedRoom );

            if(dispatchLib.has( feedRoom )) socket.off(`${feedId}:push`, dispatchLib.get( feedRoom ) );

        });

    });

    app.set( "cr.io", io );

};