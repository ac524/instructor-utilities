require("dotenv").config();

// MongoDB
require("./app/config/mongoose");

const crypto = require("crypto");

// Removed for now for security
// TODO explore other solutions for copy to clipboard
// const ncp = require("copy-paste");

const ObjectId = require("mongoose").Types.ObjectId;
const { Room, Token } = require("~crsmmodels");

const [ , , code ] = process.argv;

// const copyToClip = (toCopy, message) => new Promise(resolve => {
//     ncp.copy( toCopy, () => {
        
//         if( message ) {
//             console.log( "!\x1b[32m", message, "\x1b[0m" );
//             console.log(" ");
//         }

//         resolve();

//     } );
// });

const createRoomWithCode = async ( code ) => {

    try {

        const roomId = new ObjectId();

        const token = new Token({
            relation: roomId,
            tokenString: (code || `ROOM-${crypto.randomBytes(4).toString('hex')}`).toUpperCase() 
        });
    
        await token.save();
    
        const classroom = new Room({
            _id: roomId,
            registerCode: token._id,
            name: "PENDING"
        });
    
        await classroom.save();

        const message = `Your registration code is:`;
        const wrapper = `${"-".repeat(token.tokenString.length + 2 + message.length)}`;
    
        console.log("\n"+wrapper);
        console.log( message, "\x1b[32m", token.tokenString, "\x1b[0m" );
        console.log(wrapper);

        console.log(" ");

        // await copyToClip( token.token, "Code copied to clipboard" );

        process.exit(0);

    } catch(err) {

        console.error(err);
        process.exit(1);

    }

}

createRoomWithCode( code );