const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

require('dotenv/config');
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views', 'app/views');

app.use(session({ secret: 'somevalue' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/', (req, res) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
})


require('./App/Routers/route')(app);

app.listen(5005, function() {
    console.log('server running: http://localhost:5005');
});