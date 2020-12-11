const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const TestModel = model( "Test", new Schema({
    name: {
        type: String,
        required: true
    }
}) );

module.exports = TestModel;