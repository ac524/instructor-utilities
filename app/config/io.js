const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const { Classroom, Feed } = require("../models");
const secret = require("./options")( "secret" );


const authorizeSocket = ({ handshake }) => {

    if( handshake.headers && handshake.headers.authorization )
        
        return getUserFromVerify( handshake.headers.authorization );

}

const getUserFromVerify = token => {
    try {

        return jwt.verify( token.substr(7), secret ).id;

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
        this.library[room] = dispatch => {
            this.socket.to(room).emit(action, dispatch);
        }
        return this;
    }

    has(room) {
        return this.library.hasOwnProperty(room);
    }

    get(room) {
        return this.library[room];
    }

}

const privateChannels = {
    room: {
        authJoin : async ( userId, roomId ) => userId && await isStaffMember( userId, roomId ),
        action: "dispatch"
    },
    feed: {
        authJoin : async ( userId, feedId ) => userId && await isFeedMember( userId, feedId ),
        action: "push"
    },
    user: {
        authJoin : async ( userId, userId2 ) => userId && userId === userId2,
        action: "update"
    }
};

const configureSocket = async socket => {

    const dispatchLib = new SocketDispatchLibrary(socket);

    // Connection header authorization
    let socketUserId = authorizeSocket(socket);

    // Messaging authorization
    socket.on("authorize", bearerToken => socketUserId = getUserFromVerify(bearerToken));
    socket.on("unauthorize", () => socketUserId = false);

    /**
     * Create authorized join methods for connecting to private channel actions and room message feeds.
     */

    const keys = Object.keys( privateChannels );

    for(let i = 0; i < keys.length; i++) {

        const key = keys[i];
        const channelConfig = privateChannels[key];

        const connectItemActions = async itemId => {
            
            // Authorize the join if a method is provided
            if( !channelConfig.authJoin || await channelConfig.authJoin( socketUserId, itemId ) ) {
                
                const roomName = `${key}:${itemId}`;
                
                socket.join( roomName );

                if(!dispatchLib.has( roomName )) dispatchLib.generate( roomName, `${key}:${channelConfig.action}` );

                // Connect the socket to the private messaging channel.
                socket.on(`${itemId}:${channelConfig.action}`, dispatchLib.get( roomName ) );

            }
          
        }

        // Join room action
        socket.on(`join:${key}`, connectItemActions);

        const disconnectItemActions = itemId => {

            const roomName = `${key}:${itemId}`;

            socket.leave( roomName );

            // Disconnect the socket from the private messaging channel.
            if(dispatchLib.has( roomName )) socket.off(`${itemId}:${channelConfig.action}`, dispatchLib.get( roomName ) );

        }

        // Leave room action
        socket.on(`leave:${key}`, disconnectItemActions);

    }

}

module.exports = (server, app) => {

    const io = socketIo.listen(server);

    io.on("connect", configureSocket);

    return io;

};