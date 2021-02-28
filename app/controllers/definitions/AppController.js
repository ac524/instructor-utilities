const appTypes  = require("../../config/apps/registry.json");

const { App } = require("./models");

const SchemaController = require("../types/SchemaController");

const appTypeCtrl = require("../appType");
const roomCtrl = require("../room");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('./models/schema/AppSchema').AppDocument} AppDocument
 * 
 * @typedef {import("../types/SchemaController").CreateDocOptions} CreateDocOptions
 * @typedef {import("../types/SchemaController").CreateDocConfig} CreateDocConfig
 */

class AppController extends SchemaController {

    queryDefaults = {
        populate: "type"
    }

    constructor() {

        super( 'app', App );

    }

    /**
     * @param {CreateDocOptions} param0 
     * @param {CreateDocConfig} config
     * 
     * @returns {AppDocument}
     */
    async createOne( { data: { type, room, ...data } }, config ) {

        const appType = await appTypeCtrl.findOne({ docId: type });
        
        const app = await super.createOne({
            data: {
                name: appTypes[ appType.type ].name,
                data: appTypes[ appType.type ].default,
                room,
                type,
                ...data
            }
        }, config );

        await roomCtrl.updateOne({
            docId: room,
            data: { $push: { apps: appType._id } }
        });

        // Populate the type document.
        app.type = appType;

        // Fetch the new doc to populate the type and return.
        return app;

    }

}

module.exports = AppController;