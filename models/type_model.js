var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String,
    parent: String,
    createTime: Date
})
module.exports = mongoose.model('type', schema)