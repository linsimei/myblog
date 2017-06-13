var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String,
    message: String,
    submitTime: Date
})
module.exports = mongoose.model('comment', schema)