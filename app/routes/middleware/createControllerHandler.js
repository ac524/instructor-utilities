/**
 * @param {Map} dataMap 
 */
const crdataAgg = dataMap => {

}

const mapRequestData = (req, include) => ({
    ...req.params,
    // Extract target keys from the request object
    ...["body", "user", ...include].reduce( (data, key) => ({ ...data, [key]: req[key] }), {} ),
    ...[...req.crdata].reduce( (data, [key, value]) => ({ ...data, [key]: value }), {} )
});

const createControllerHandler = ( controller, { include = [] } = {} ) => async ( req, res, next ) => {

    try {

        res.json( (await controller( mapRequestData( req, include ) )) || { success: true } );

    } catch( err ) {

        next( err )

    }

}

module.exports = createControllerHandler;