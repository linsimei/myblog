var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    author: String,
    title: String,
    content: String,
    submitTime: Date,
    type: String,
    recommend: Boolean,
    views: Number
})
module.exports = mongoose.model('article', articleSchema)