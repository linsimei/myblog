var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var photo = require("../models/photo_model.js");

mongoose.createConnection('mongodb://localhost/test');


router.get('/', function(req, res, next) {
    res.render('photos/photo');
});

router.get('/upload', function(req, res, next) {
    res.render('photos/upload');
});

router.post("/upload", function(req, res, next) {
    var title = req.body.title;
    var src = req.body.src;

    var newItem = new photo({
        title: title,
        src: src,
        createTime: new Date()
    })
    newItem.save(function(err, newItem) {
        return res.redirect("/photo");
    })

})

router.get("/all", function(req, res, next) {
    photo.find(function(err, items) {
        items.sort((a, b) => a.createTime < b.createTime)
        res.json(items);
    })
})

router.get("/recent", function(req, res, next) {
    photo.find(function(err, newPhotos) {
        newPhotos.sort((a, b) => a.createTime < b.createTime)
        res.json(newPhotos);
    })
})

module.exports = router;