const mongoose = require("mongoose");
const { model, Schema } = mongoose;

module.exports = model( "Test", new Schema({
    name: {
        type: String,
        required: true
    }
}) );