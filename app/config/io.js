const jwt = require("jsonwebtoken");
const { Feed } = require("../controllers/definitions/models");
const { roomCtrl } = require("../controllers");
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

    const room = await roomCtrl.findOne( { docId: roomId }, { select: "staff" } );

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

    generate(room,action,key) {
        this.library[`${room}:${action}`] = dispatch => {
            this.socket.to(room).emit(`${key}:${action}`, dispatch);
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
        actions: [ "dispatch" ]
    },
    feed: {
        authJoin : async ( userId, feedId ) => userId && await isFeedMember( userId, feedId ),
        actions: [ "push", "update", "delete" ]
    },
    user: {
        authJoin : async ( userId, userId2 ) => userId && userId === userId2,
        actions: [ "update" ]
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

            // console.log(itemId);

            // Authorize the join if a method is provided
            if( !channelConfig.authJoin || await channelConfig.authJoin( socketUserId, itemId ) ) {

                const roomName = `${key}:${itemId}`;
                
                socket.join( roomName );

                for( action of  channelConfig.actions) {

                    const socketFeedKey = `${roomName}:${action}`;

                    if(!dispatchLib.has( socketFeedKey )) dispatchLib.generate( roomName, action, key );

                    // Connect the socket to the private messaging channel.
                    socket.on(`${itemId}:${action}`, dispatchLib.get( socketFeedKey ) );

                }

            }
          
        }

        // Join room action
        socket.on(`join:${key}`, connectItemActions);

        const disconnectItemActions = itemId => {

            const roomName = `${key}:${itemId}`;

            socket.leave( roomName );

            for( action of  channelConfig.actions) {

                const socketFeedKey = `${roomName}:${action}`;
                // Disconnect the socket from the private messaging channel.
                if(dispatchLib.has( socketFeedKey )) socket.off(`${itemId}:${action}`, dispatchLib.get( socketFeedKey ) );

            }

        }

        // Leave room action
        socket.on(`leave:${key}`, disconnectItemActions);

    }

}

module.exports = server => {

    const io = require("socket.io")( server );

    io.on("connection", configureSocket);

    return io;

};