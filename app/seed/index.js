require("../config/mongoose");

const { seedUser } = require("./seeds");

const seedDb = async () => {

    const seeds = [
        [ "User", seedUser ]
    ];

    const divider = "================================";

    try {

        let totalCreated = 0;

        for( let i = 0; i < seeds.length; i++ ) {

            const [ name, seeder ] = seeds[i];

            console.log("\n"+divider);
            console.log(`[Running ${name} seed]`);

            const usersResult = await seeder();

            totalCreated += usersResult.result.n;
    
            console.log(`${usersResult.result.n} ${name} documents created`);
            console.log(divider+"\n");

        }

        console.log("\n"+divider);
        console.log("SEED COMPLETE...");
        console.log(`${totalCreated} documents created`);
        console.log(divider+"\n");

        process.exit(0);

    } catch( err ) {

        console.error(err);
        process.exit(1);

    }

}

seedDb();