var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var type = require("../models/type_model.js");

mongoose.createConnection('mongodb://localhost/test');


router.get('/', function(req, res, next) {
    type.find(function(err, items) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].parent) {
                items[i].parent = items.find(x => x.id === items[i].parent).name;
            }
        }
        res.render('type/list', { types: items });
    })

});

router.get("/add", function(req, res, next) {
    type.find({ parent: "" }, function(err, items) {
        res.render('type/add', { types: items });
    })
})

router.post("/add", function(req, res, next) {
    var name = req.body.name;
    var parent = req.body.parent;

    var newType = new type({
        name: name,
        parent: parent,
        createTime: new Date()
    })
    newType.save(function(err, newType) {
        return res.redirect("/type")
    })

});


router.get("/edit", function(req, res, next) {
    var types = new Object();
    type.find({ parent: "" }, function(err, items) {
        types = items;
        type.findOne({ _id: req.query.id }, function(err, type) {
            console.log(type);
            res.render('type/edit', { types: items, type: type });
        })

    })
})


router.post("/edit", function(req, res, next) {
    var name = req.body.name;
    var parent = req.body.parent;
    var id = req.body.id;
    type.findOne({ _id: id }, function(err, type) {
        type.name = name;
        type.parent = parent;
        type.save(function(err, saveType) {
            console.log(saveType);
            res.redirect("/type");
        })
    })
})


router.get("/delete", function(req, res, next) {
    var id = req.query.id;
    type.remove({ _id: id }).exec();
    res.redirect("/type");
})

router.get("/parent_type", function(req, res, next) {
    type.find(function(err, items) {
        res.json(items);
    })
})





module.exports = router;