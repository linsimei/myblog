var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var userSchema = mongoose.Schema({
    username: String,
    password: String
})

var user = mongoose.model('blog-user', userSchema)





/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', { title: "注册页" });
});


router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    try {
        if (!(username.length >= 1 && username.length <= 10)) {
            throw new Error('用户名请限制在1-10个字符')
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/register');
    }

    password = sha1(password);
    user.find({ username: username }, function(err, users) {
        if (users.length > 0) {
            return res.json({ errors: [{ name: "username", error: '用户名已被使用' }] })
        }
    })


    var someone = new user({ username: username, password: password });

    console.log("someone");
    console.log(someone);
    someone.save(function(err, someone) {
        console.log(someone);
        return res.json(someone);
    })

})


router.get("/users", function(req, res, next) {
    user.find(function(err, users) {
        console.log(users);
        return res.json(users);
    })
})

//登录页面
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    user.find({ username: username, password: password }, function(err, users) {
        if (users.length == 0) {
            return res.json({ errors: [{ name: "username", error: '登录失败' }] })
        }
        return res.json({ errors: [] });
    })
})



module.exports = router;