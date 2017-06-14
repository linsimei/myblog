var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var article = require("../models/article_model.js");
var type = require("../models/type_model.js");

mongoose.createConnection('mongodb://localhost/test');


router.get('/', function (req, res, next) {
    res.render('article/web');
});


router.get("/type", function (req, res, next) {
    type.findOne({ name: "前端" }, function (err, parent) {
        if (parent) {
            type.find({ parent: parent._id }, function (err, children) {
                res.json(children);

            });
        }
    })
})


router.get("/get_articles", function (req, res, next) {
    var id = req.query.id;
    type.findOne({ name: "前端" }, function (err, parent) {
        type.find({ parent: parent._id }, function (err, children) {
            var child_ids = children.map(x => x._id);
            if (id) {
                article.find({ type: id }, function (err, articles) {
                    res.json(articles);
                })
            } else {
                article.find({ type: child_ids }, function (err, articles) {
                    res.json(articles);
                })
            }

        });

    })
})



module.exports = router;