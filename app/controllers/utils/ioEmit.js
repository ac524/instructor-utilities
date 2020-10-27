module.exports = (req, action, message, room) => {

    // Get the global io.
    const io = req.app.get("cr.io");

    // Emit to the room if provided, else broadcast to all.
    (room ? io.to(room) : io).emit( action, message );
    
}