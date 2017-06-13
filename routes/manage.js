var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var article = require("../models/article_model.js");
mongoose.createConnection('mongodb://localhost/test');

router.get('/', function(req, res, next) {
    res.render('article/articles');
});
router.get('/get_articles', function(req, res, next) {
    article.find({ type: { $ne: null } }, function(err, articles) {
        articles.sort((a, b) => a.submitTime < b.submitTime);
        res.json(articles);
    })
});






module.exports = router;