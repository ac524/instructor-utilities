const { Feed } =  require("../../models");
const entryTypes = require("./entries");

const getSingle = async ({ feedId }) => await Feed.findById( feedId );

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