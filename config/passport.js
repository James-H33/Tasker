const passport         = require('passport');
const User             = require('../models/user');
const LocalStrategy    = require('passport-local').Strategy;

// Tells Passport how to store user
passport.serializeUser(function(user, done) {
    done(null, user.id); // Tells Passport to store user in session by id
});

passport.deserializeUser(function(id, done){
    // User mongoose to find the user
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Register Strategy || Applied to register post route
passport.use('local.register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {

    // validation of email
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({ min: 4 });

    var errors = req.validationErrors(); 
    var messages = [];
    if (errors) {
        errors.forEach(function(err) {
            messages.push(err.msg); // .msg ensures that you push only the message and not the whole object
        });

        // null = err; false = not successful; Send error messages to the view
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({ 'email' : email }, function(err, user) {
        if (err) {
            return done(err);
        }
        // If a user is found(User.findOne) then that means that user already exists
        if (user) {
            // no error but not successful
            return done(null, false, { message: 'Email is already in use.' });
        }

        // Create new user
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result){
            if (err) {
                return done(err);
            }

            return done(null, newUser);
        });
    });
}));

// Login Strategy || Applied to login post route
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, function(req, email, password, done) {

     // validation of email
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({ min: 4 });

    var errors = req.validationErrors(); 
    var messages = [];
    if (errors) {
        errors.forEach(function(err) {
            messages.push(err.msg); // .msg ensures that you push only the message and not the whole object
        });

        // null = err; false = not successful; Send error messages to the view
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({ 'email' : email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { messages: 'User is not found.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { messages: 'Incorrect Password' });
        }

        return done(null, user);
    });
}));
