const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
    },
    ipAddress: {
        type: String,
        unique: true
    },
    history: {
        type: Array
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;