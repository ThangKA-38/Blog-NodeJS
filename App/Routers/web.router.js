const authMiddleware = require('../middlewares/auth.middleware');

module.exports = app => {
    var router = require('express').Router();

    router.get('/home', authMiddleware.loggedin, (req, res) => {
        res.render('home');
    });


    router.get('/blog', authMiddleware.loggedin, (req, res) => {
        res.render('blog')
    })


    app.use(router);
}