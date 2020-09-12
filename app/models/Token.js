const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    relation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        // Expire in 12 hours
        expires: 43200
    }
});

module.exports = mongoose.model("Token", TokenSchema);