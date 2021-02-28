require("../app/config/mongoose");

const db = require("../controllers/models");

const resetDb = async () => {

    try {

        const models = Object.values( db );
    
        for( let i = 0; i < models.length; i++ )
    
            await models[i].deleteMany({});

        process.exit(0);

    } catch(err) {

        process.exit(1);

    }

}

resetDb();