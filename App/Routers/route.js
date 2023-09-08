module.exports = app => {
    require('./auth.route')(app);

    require('./web.router')(app);

    require('./blog.router')(app);
}