require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db')
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const port = 5000 || process.env.PORT;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))

app.use(passport.initialize());
app.use(passport.session());


//middle-ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

connectDB();

//Static Files
app.use(express.static('public'));

//Templatting Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./server/routes/index.js'));
app.use('/', require('./server/routes/dashboard.js'));
app.use('/', require('./server/routes/auth.js'));


//Handle 404
app.use('*', function (req, res) {
    res.status(404).send('404 Page Not Found!!!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})