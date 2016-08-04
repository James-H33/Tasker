const express           = require('express');
const favicon           = require('serve-favicon');
const cookieParser      = require('cookie-parser');
const logger            = require('morgan');
const bodyParser        = require('body-parser');
const validator         = require('express-validator');
const mongoose          = require('mongoose');
const session           = require('express-session');
const passport          = require('passport');
const flash             = require('connect-flash');

// Routes
const IndexRoutes   = require('./routes/index');
const UserRoutes    = require('./routes/user');

// Define app
const app = express();

// Database
mongoose.connect('mongodb://localhost/tasker');
require('./config/passport'); // Execute passport configuration


const port      = process.env.PORT || 3000;
const portIP    = process.env.IP;

// Set Template Extension
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'practicalsteelchicken',
    resave: false,
    saveUninitialized: false
 }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    next();
});

app.get('/', function(req, res, next) {
    res.redirect('/home');
});

// Routes
app.use('/', IndexRoutes);
app.use('/', UserRoutes);

app.listen(port, portIP, ()=> console.log('Server has started on port: ' + port));
