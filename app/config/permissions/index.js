const {
    RoomSet,
    StudentSet,
    InviteSet,
    FeedSet,
    FeedCommentSet,
    FeedElevateSet,
    FeedDeelevateSet
} = require("./sets");

class Permissions {

    constructor() {

        this.room = new RoomSet();
        this.student = new StudentSet();
        this.invite = new InviteSet();
        this.feed = new FeedSet();
        this.feedComment = new FeedCommentSet();
        this.feedElevate = new FeedElevateSet();
        this.feedDeelevate = new FeedDeelevateSet();

        /** Validate keys */
        for( const key in this ) if( key !== this[key].key )
        
            throw Error( `Invalid permissions configuration for ${key} set. The permissions key must match the set key.` );

    }

    /**
     * 
     * @param {string} permission 
     */
    has( permission ) {
        
        const [ verb, ...setParts ] = permission.toLowerCase().split('_');
        const setKey = setParts.map((part,i)=>i ? (part[0].toUpperCase()+part.slice(1)) : part).join('');

        return setKey in this && ( this[setKey][verb] === permission );

    }

}

const permissions = new Permissions();

module.exports = permissions;