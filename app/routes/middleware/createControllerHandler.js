const mapRequestData = (req, include) => ({
    ...req.params,
    ...["body", "user", ...include].reduce( (data, key) => ({ ...data, [key]: req[key] }), {} )
});

const createControllerHandler = ( controller, { include = [] } = {} ) => async ( req, res, next ) => {

    try {

        res.json( (await controller( mapRequestData( req, include ), req )) || { success: true } );

    } catch( err ) {

        next( err )

    }

}

module.exports = createControllerHandler;