require("dotenv").config();

// MongoDB
require("./app/config/mongoose");

const crypto = require("crypto");
const ncp = require("copy-paste");

const ObjectId = require("mongoose").Types.ObjectId;
const { Classroom } = require("./app/models");
const Token = require("./app/models/Token");

const [ , , code ] = process.argv;

const createRoomWithCode = async ( code ) => {

    try {

        const roomId = new ObjectId();

        const token = new Token({
            relation: roomId,
            token: (code || `ROOM-${crypto.randomBytes(4).toString('hex')}`).toUpperCase() 
        });
    
        await token.save();
    
        const classroom = new Classroom({
            _id: roomId,
            registerCode: token._id,
            name: "PENDING"
        });
    
        await classroom.save();

        const message = `Your registration code is:`;
        const wrapper = `${"-".repeat(token.token.length + 2 + message.length)}`;
    
        console.log("\n"+wrapper);
        console.log( message, "\x1b[32m", token.token, "\x1b[0m" );
        console.log(wrapper);

        console.log(" ");

        ncp.copy( token.token, function() {
            
            console.log( "!\x1b[32m", "Code copied to clipboard", "\x1b[0m" );
            console.log(" ");
    
            process.exit(0);

        } );

    } catch(err) {

        console.error(err);
        process.exit(1);

    }

}

createRoomWithCode( code );