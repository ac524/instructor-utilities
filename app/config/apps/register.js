const appTypes  = require("./registry.json");
const appTypeLibrary = require("./library");

const appTypeCtrl = require("../../controllers/appType");

const registerAppTypes = async () => {

    const registered = await appTypeCtrl.findMany({ search: {} });

    const processed = [];
    const types = Object.keys( appTypes );

    // Update existing entries.
    for( let i = 0; i < registered.length; i++ ) {

        appTypeLibrary.set( registered[i]._id.toString(), registered[i] );

        processed.push( registered[i].type );

        const updates = [];
        const appRegistry = appTypes[registered[i].type] ? appTypes[registered[i].type] : false;

        if( !appRegistry ) {

            if( !registered[i].isDisabled ) updates.push(["isDisabled", true]);

        } else {

            if( registered[i].isDisabled ) updates.push(["isDisabled", false]);

        }

        if( updates.length ) await registered[i].update( Object.fromEntries(updates) );

    }

    const toRegister = types.filter( type => !processed.includes(type) );

    // Register new apps.
    for( let i = 0; i < toRegister.length; i++ ) {

        const appType = await appTypeCtrl.createOne({
            data: {
                type: toRegister[i],
            }
        });

        appTypeLibrary.set( appType._id.toString(), appType );

    }

}

module.exports = registerAppTypes;