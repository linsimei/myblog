var mongoose = require('mongoose');

var schema = mongoose.Schema({
    title: String,
    src: String,
    createTime: Date
})
module.exports = mongoose.model('photo', schema)