const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify( fs.writeFile );

const setupQuestions = [
    // {
    //     message: "What is your localhost MongoDB username?",
    //     type: "input",
    //     name: "DEV_DB_USER",
    //     default: "root"
    // },
    // {
    //     message: "What is your localhost MySQL password?",
    //     type: "input",
    //     name: "DEV_DB_PASS"
    // },
    {
        message: "Please provide a unique string as your JWT secret.",
        type: "input",
        name: "JWT_SECRET"
    }
];

const doSetup = async () => {

    // Get user responses.
    const response = await inquirer.prompt( setupQuestions );
    const envEntries = [];

    // For each response with a value, add a line for the associated .env variable.
    Object.entries( response ).forEach( ([ key, value ]) => {

        if( value )

            envEntries.push(`${key}="${value}"`);

    } );

    // If we have configurations to write into the .env file.
    if( envEntries.length ) {

        try {

            // Try to write the file and then log a success message.
            await writeFileAsync( ".env", envEntries.join("\n") );
            console.log( "\x1b[32m", `\nGenerated .env file with ${envEntries.length} configuration values.` );

        } catch( err ) {

            // Catch and display an error if the file could not be written.
            console.log( "\x1b[31m", "\nUnablet to write .env file." );

        }

        exitMessage();

    } else {

        // Show a warning if the user didn't provide any valid entries to write.
        console.log( "\x1b[33m", `No configuration values provided to write to .env file` );

        const { tryAgain } = await inquirer.prompt({ message: "Would you like to restart the setup?", type: "list", choices: [ "Yes", "No" ], name: "tryAgain" });

        if( "Yes" === tryAgain ) await doSetup();

        else exitMessage();

    }

}

const exitMessage = () => console.log( "\x1b[0m", "\nExiting setup. Goodbye.\n" );

doSetup();