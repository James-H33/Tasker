const express       = require('express');
const router        = express.Router();
const passport      = require('passport');

// Models
const User = require('../models/user');

router.get('/login', function(req, res, next) {
    var messages = req.flash('error');
    res.render('login', { messages: messages, hasErrors: messages.length > 0 });
});

router.get('/register', function(req, res, next) {
    var messages = req.flash('error');
    res.render('register', { messages: messages, hasErrors: messages.length > 0 });
});

// failureFlash || flashes the message that set in LocalStrategy
router.post('/register', passport.authenticate('local.register', {
    successRedirect: '/home',
    failureRedirect: '/register',
    failureFlash: true
}));

// failureFlash || flashes the message that set in LocalStrategy
router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/home');
});


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}
