const SchemaController = require("../../types/SchemaController");

const { Feed } = require("../../../models");

const entryTypes = require("./entries");

/**
 * TYPE DEFINITIONS FOR METHODS
 * 
 * @typedef GetFeedItemsOptions
 * @property {ObjectId} feedId
 */

class FeedController extends SchemaController {

    constructor() {

        super( 'feed', Feed );

    }

    get entryTypes() {
        return entryTypes
    }

    /**
     * 
     * @param {GetFeedItemsOptions} param0
     */
    async getItems({ feedId }) {

        const feed =
            await this.findOne({ docId: feedId }, {
                populate: [ ["items.by","name"] ],
                select: "items"
            });

        const items = [];

        for(let i=0; i < feed.items.length; i++)

            items.push( feed.items[i] );

        return items;

    }

}

module.exports = FeedController;