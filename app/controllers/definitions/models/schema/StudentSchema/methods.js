const Feed = require("../../Feed");
const User = require("../../User");

const feedAggregates = [
    {
        key: "elevation",
        includes: ["elevate", "deelevate"],
        start: 0,
        reducer: ( elevation, entry ) => elevation + (entry.action === "elevate" ? 1 : -1)
    },
    {
        key: "recentComments",
        includes: ["comment"],
        start: [],
        reducer: ( comments, entry ) => [ entry, ...comments.slice(0,2) ],
        finally: async ( rawComments ) => {

            const comments = [];

            for( let i=0; i < rawComments.length; i++ ) {

                comments.push({
                    ...rawComments[i],
                    by: await User.findById( rawComments[i].by ).select("name")
                });

            }

            return comments;

        }
    }
];

const feedAggregatesFilter = include => agg => !include || include.includes( agg.key );

module.exports = {

    getAggregateKeysByAction( action ) {

        return feedAggregates.reduce( (keys, agg) => agg.includes.includes(action) ? [ ...keys, agg.key ] : keys, [] );

    },

    getFeedAggregateData: async function( include ) {

        const aggregates = feedAggregates.filter( feedAggregatesFilter(include) );

        const aggActions = [
            ...new Set( aggregates.reduce( (actions, { includes }) => [ ...actions, ...includes ], [] ) )
        ];
        
        const [ feed ] = await Feed.aggregate([
        
            { $match: { _id: this.feed } },
        
            { $unwind: '$items'},
        
            { $match: {"items.action": { $in: aggActions } }},
        
            { $group: { _id: '$_id', items: { $push: '$items' }}},

            // {
            //     $replaceRoot: {
            //         newRoot: {
            //             $mergeObjects: [
            //                 { items: [] },
            //                 "$$ROOT"
            //             ]
            //         }
            //     }
            // }
        
        ]);
        
        const aggregateReducer = ( data, entry ) => {
            
            return aggregates.reduce(
                ( data, agg ) => {
            
                    if( !agg.includes.includes( entry.action ) ) return data;
            
                    return {
                        ...data,
                        [agg.key]: agg.reducer(
                            data.hasOwnProperty( agg.key ) ? data[agg.key] : agg.start,
                            entry
                        )
                    }
            
                },
                data
            )
        
        }

        const data = feed ? feed.items.reduce( aggregateReducer, {} ) : {};

        for( let i=0; i < aggregates.length; i++ ) {

            if( !aggregates[i].finally || !data.hasOwnProperty(aggregates[i].key) ) continue;

            data[aggregates[i].key] = await aggregates[i].finally( data[aggregates[i].key] );

        }
        
        return data;
    
    }

}