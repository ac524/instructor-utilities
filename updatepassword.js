require("dotenv").config();

// MongoDB
require("~crsm/config/mongoose");

const passwordHash = require("~crsm/config/utils/passwordHash");

const { User } = require("~crsmmodels");

const [ , , userId, password ] = process.argv;

const updatepassword = async ( userId, password ) => {

    try {

        const user = await User.findByIdAndUpdate( userId, {
            password: await passwordHash( password )
        }, { new: true } );

        if( !user ) {

            console.log( `User id ${userId} not found` );

        } else {
            
            console.log( "Updated user", user );

        }
        
        process.exit(0);

    } catch(err) {

        console.log( err );

        console.error(err);
        process.exit(1);

    }

}

updatepassword( userId, password );