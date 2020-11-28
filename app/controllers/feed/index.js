const { Feed } =  require("../../models");
const entryTypes = require("./entries");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 */

/** CONTROLLER METHODS **/

/**
 * @typedef GetFeedOptions
 * @property {ObjectId} feedId
 * 
 * @param {GetFeedOptions} param0 
 */
const getSingle = async ({ feedId }) => await Feed.findById( feedId );

/**
 * @typedef GetFeedItemsOptions
 * @property {ObjectId} feedId
 * 
 * @param {GetFeedItemsOptions} param0 
 */
const getSingleItems = async ({ feedId }) => {

    const feed =
        await Feed
            .findById( feedId )
            .populate("items.by","name")
            .select("items")

    const items = [];

    for(let i=0; i < feed.items.length; i++)

        items.push( feed.items[i] );

    return items;

}

module.exports = {
    getSingle,
    getSingleItems,
    entryTypes
}