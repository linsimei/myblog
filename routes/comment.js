var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var comment = require("../models/comment_model.js");
mongoose.createConnection('mongodb://localhost/test');

/* GET comment listing. */
router.get('/', function(req, res, next) {
    res.render('comment/list');
});
router.post('/', function(req, res, next) {
    var name = req.body.name;
    var message = req.body.message;
    var submitTime = new Date();

    var newComment = new comment({
        name: name,
        message: message,
        submitTime: submitTime,
    })
    newComment.save(function(err, newComment) {
        return res.redirect("/comment")
    })

})

router.get('/comment_json', function(req, res, next) {
    comment.find(function(err, items) {
        items.sort((a, b) => a.submitTime < b.submitTime)
        res.json(items);
    })


});
router.get("/delete", function(req, res, next) {
    var id = req.query.id;
    comment.remove({ _id: id }).exec();
    res.redirect("/comment");
})
module.exports = router;