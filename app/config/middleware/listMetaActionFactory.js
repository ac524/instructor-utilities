const { ListMeta } = require("../../models");

// console.log( "load meta routes" );
const getIndexOptions = ( { params: { listId: ListId }, user: { id: UserId } }, key ) => ({
    UserId,
    ListId,
    key
});

const metaActions = {
    pushItemIdToArray: async ( req, res, key ) => {
    
        try {
    
            const newValue = parseInt( req.body.itemId || req.params.itemId );
            const metaProperties = getIndexOptions( req, key );
    
            const metaEntry = await ListMeta.findOne( {
                where: metaProperties
            } );
    
            const exists = Boolean( metaEntry );
    
            if( exists ) {
    
                // TODO move to model as a validator
                if( metaEntry.dataValues.value.includes(newValue) ) throw new Error( "Cannot select duplicate ids" );
    
                const value = [ ...metaEntry.dataValues.value ];
                value.push( newValue );
    
                await metaEntry.update( { value } );
    
            } else {
    
                const value = [ newValue ];
                await ListMeta.create( { ...metaProperties, value } );
    
            }
    
            res.json({success:true});
    
        } catch( err ) {
    
            console.log( err );
    
            res.status(401).json(err);
    
        }
    
    },
    removeItemIdFromArray: async ( req, res, key ) => {

        try {
    
            const targetValue = parseInt( req.body.itemId );
            const metaProperties = getIndexOptions( req, key );
    
            const metaEntry = await ListMeta.findOne( {
                where: metaProperties
            } );
    
            const targetIndex = metaEntry.dataValues.value.indexOf(targetValue);
    
            if( targetIndex > -1 ) {
    
                const value = [ ...metaEntry.dataValues.value ];
                value.splice( targetIndex, 1 );
    
                await metaEntry.update( { value } );
    
            }
    
            res.json({success:true});
    
        } catch( err ) {
    
            console.log( err );
    
            res.status(401).json(err);
    
        }
    
    },
    clearArray: async ( req, res, key ) => {

        const metaProperties = getIndexOptions( req, key );
    
        try {
    
            await ListMeta.update( { value: [] }, { where: metaProperties } );
    
            res.json({success:true});
    
        } catch( err ) {
    
            console.log( err );
    
            res.status(401).json(err);
    
        }
    
    }
};

const listMetaActionFactory = ( action, metaKey ) => async ( req, res ) => {
    
    await metaActions[action]( req, res, metaKey );

};

module.exports = listMetaActionFactory;