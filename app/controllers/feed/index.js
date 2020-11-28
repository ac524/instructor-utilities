const { Feed } =  require("../../models");

const actions = require("../actions");

const entryTypes = require("./entries");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('../../models/schema/FeedSchema').FeedDocument} FeedDocument
 * @typedef {import('../actions/createOne').CreateDocOptions} CreateDocOptions
 * 
 * @typedef FeedData
 * @property {ObjectId} _id
 * @property {ObjectId} room
 * @property {ObjectId} for
 * @property {string} in
 */

/** CONTROLLER METHODS **/

/**
 * @param {FeedData} data
 * @param {CreateDocOptions} config
 * @returns {FeedDocument}
 */
const create = async ( data, config ) => await actions.createOne( Feed, data, config );

/**
 * @typedef GetFeedOptions
 * @property {ObjectId} feedId
 * 
 * @param {GetFeedOptions} param0
 * @returns {FeedDocument}
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
    create,
    getSingle,
    getSingleItems,
    entryTypes
}