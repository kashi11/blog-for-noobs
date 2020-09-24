var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    username: String,
    date: String
});

var postModel = mongoose.model("post",postSchema);
module.exports = postModel;