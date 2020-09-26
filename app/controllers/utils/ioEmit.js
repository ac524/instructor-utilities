module.exports = (req, io, action, payload, force = false) => {
    io.emit( action, {
        payload,
        from: req.userSocket && req.userSocket.id,
        force
    } );
}