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

// failureFlash || flashes the message that set in LocalStrategy

module.exports = router;
