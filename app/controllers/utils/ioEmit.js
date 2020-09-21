module.exports = (req, io, action, payload) => {
    io.emit( action, {
        payload,
        from: req.userSocket && req.userSocket.id
    } );
}