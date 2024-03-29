const getEntriesReducer = keyMap => (data, [key, value]) => ({ ...data, [ keyMap[key] || key ]: value });

const mapRequestData = (req, include, keyMap) => ({
    // Add all route parameters as keys.
    ...Object.entries(req.params).reduce( getEntriesReducer(keyMap), {}),
    // Extract target keys from the request object.
    ...["body", "user", ...include].reduce( (data, key) => ({ ...data, [ keyMap[key] || key ]: req[key] }), {} ),
    // Add all data points pushed to the `crdata` Map.
    ...[...req.crdata].reduce( getEntriesReducer(keyMap), {} )
});

const createControllerHandler = ( controller, { include = [], keyMap = {} } = {} ) => async ( req, res, next ) => {

    try {

        res.json( (await controller( mapRequestData( req, include, { body: "data", ...keyMap } ) )) || { success: true } );

    } catch( err ) {

        next( err )

    }

}

module.exports = createControllerHandler;