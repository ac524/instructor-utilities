const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model( "Test", new Schema({
    name: {
        type: String,
        required: true
    }
}) );