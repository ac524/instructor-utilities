const Feed = require("../Feed");

const feedAggregates = [
    {
      key: "elevation",
      includes: ["elevate", "deelevate"],
      start: 0,
      reducer: ( elevation, entry ) => elevation + (entry.action === "elevate" ? 1 : -1)
    }
];

const feedAggregatesFilter = include => agg => !include || include.includes( agg.key );

module.exports = {

    getFeedAggregate: async function( includes ) {

        return {
          ...this.toObject(),
          ...(await this.getFeedAggregateData( includes ))
        }
      
    },

    getFeedAggregateData: async function( include ) {

        const aggActions = [
            ...new Set(
                feedAggregates
                    .filter( feedAggregatesFilter(include) )
                    .reduce( (actions, { includes }) => [ ...actions, ...includes ], [] )
            )
        ];
        
        const [ feed ] = await Feed.aggregate([
        
            { $match: { _id: this.feed } },
        
            { $unwind: '$items'},
        
            { $match: {"items.action": { $in: aggActions } }},
        
            { $group: { _id: '$_id', items: { $push: '$items' }}}
        
        ]);
        
        const aggregateReducer = ( data, entry ) => {
            
            return feedAggregates.reduce(
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
        
        return feed.items.reduce( aggregateReducer, {} );
    
    }

}