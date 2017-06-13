var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var article = require("../models/article_model.js");

mongoose.createConnection('mongodb://localhost/test');


router.get('/', function(req, res, next) {
    article.find({ type: "心情" }, function(err, articles) {
        articles.sort((a, b) => b.submitTime - a.submitTime);
        res.render('article/feeling', { articles: articles });
    })


});




module.exports = router;