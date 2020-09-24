var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

var userModel = mongoose.model("user",UserSchema);
module.exports = userModel;