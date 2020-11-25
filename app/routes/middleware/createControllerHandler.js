const mapRequestData = (req, include, keyMap) => ({
    // Add all route parameters as keys.
    ...req.params,
    // Extract target keys from the request object.
    ...["body", "user", ...include].reduce( (data, key) => ({ ...data, [ keyMap[key] || key ]: req[key] }), {} ),
    // Add all data points pushed to the `crdata` Map.
    ...[...req.crdata].reduce( (data, [key, value]) => ({ ...data, [key]: value }), {} )
});

const createControllerHandler = ( controller, { include = [], keyMap = {} } = {} ) => async ( req, res, next ) => {

    try {

        res.json( (await controller( mapRequestData( req, include, keyMap ) )) || { success: true } );

    } catch( err ) {

        next( err )

    }

}

module.exports = createControllerHandler;