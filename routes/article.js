var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var article = require("../models/article_model.js");
var Date = require('../utils/common');

mongoose.createConnection('mongodb://localhost/test');

//列表
router.get('/', function(req, res, next) {
    article.find(function(err, articles) {
        res.render('article/articles', { articles: articles });
    })



});
//文章内容:
router.get('/content', function(req, res, next) {
    var id = req.query.id;
    article.findOne({ _id: id }, function(err, article) {
        if (article.views === undefined) {
            article.views = 1;
        } else {
            article.views++;
        }


        article.save(function(err, article) {

            res.render('article/content', { article: article });
        })
    })
});


//创建
router.get('/create', function(req, res, next) {
    res.render('article/create');
});
router.post('/create', function(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var type = req.body.type;
    var author = req.body.author;
    var submitTime = new Date();

    var newArticle = new article({
        title: title,
        content: content,
        submitTime: submitTime,
        type: type,
        author: author
    })
    newArticle.save(function(err, newArticle) {
        return res.redirect("/article")
    })

})


//更新
router.get('/modify', function(req, res, next) {
    res.render('article/modify');
});

router.post('/modify', function(req, res, next) {
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    var type = req.body.type;
    var author = req.body.author;
    var submitTime = new Date();

    article.findOne({ _id: id }, function(err, saveitem) {
        saveitem.title = title;
        saveitem.content = content;
        saveitem.type = type;
        saveitem.author = author;
        saveitem.submitTime = submitTime;

        saveitem.save(function(err, saveitem) {
            console.log(saveitem);
            res.redirect("/manage");
        })
    })

})

router.get("/get_article", function(req, res, next) {
    var id = req.query.id;
    console.log(id);
    article.findOne({ _id: id }, function(err, article) {
        return res.json(article);
    })
})

router.get("/delete", function(req, res, next) {
    var id = req.query.id;
    article.remove({ _id: id }).exec();
    res.redirect("/manage");
})


router.get("/recommend", function(req, res, next) {
    var id = req.query.id;
    article.findOne({ _id: id }, function(err, saveitem) {
        saveitem.recommend = !saveitem.recommend;

        saveitem.save(function(err, saveitem) {

            res.redirect("/manage");
        })
    })
})


router.get("/all_recommend", function(req, res, next) {
        article.find({ recommend: true }, function(err, items) {
            items.sort((a, b) => a.submitTime < b.submitTime);
            res.json(items);
        })
    })
    //文章分类统计:
router.get("/types", function(req, res, next) {
        article.find(function(err, types) {
            res.json(types);
        })
    })
    //获取最新的10篇文章:
router.get("/recent", function(req, res, next) {
        article.find(function(err, newArticle) {
            newArticle.sort((a, b) => a.submitTime < b.submitTime)
            res.json(newArticle);
        })
    })
    //获取最热门的10篇文章:
router.get("/hot", function(req, res, next) {
    article.find(function(err, hotArticle) {
        hotArticle.sort((a, b) => a.viwe < b.viwe);
        res.json(hotArticle);
    })
})

module.exports = router;