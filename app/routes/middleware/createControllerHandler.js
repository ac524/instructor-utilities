const mapRequestData = ({ params, body, roomId, user }) => ({
    ...params,
    body,
    roomId,
    user
});

const createControllerHandler = ( controller ) => async ( req, res, next ) => {

    try {

        res.json( await controller( mapRequestData( req ) ) );

    } catch( err ) {

        next( err )

    }

}

module.exports = createControllerHandler;