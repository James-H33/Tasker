const express           = require('express');
const favicon           = require('serve-favicon');
const cookieParser      = require('cookie-parser');
const logger            = require('morgan');
const bodyParser        = require('body-parser');
var mongoose            = require('mongoose');

// Routes
const IndexRoutes = require('./routes/index');

const app = express();

// Database
mongoose.connect('mongodb://localhost/tasker');

const port = process.env.PORT || 3000;
const portIP = process.env.IP;

// Set Template Extension
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


// Routes
app.use('/', IndexRoutes);

app.listen(port, portIP, ()=> console.log('Server has started on port: ' + port));
