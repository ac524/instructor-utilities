require("dotenv").config();

// MongoDB
require("./app/config/mongoose");

const passwordHash = require("./app/config/utils/passwordHash");

const { User } = require("./app/models");

const [ , , userId, password ] = process.argv;

const updatepassword = async ( userId, password ) => {

    try {

        await User.findByIdAndUpdate( userId, {
            password: await passwordHash( password )
        } );
        
        process.exit(0);

    } catch(err) {

        console.log( err );

        console.error(err);
        process.exit(1);

    }

}

updatepassword( userId, password );