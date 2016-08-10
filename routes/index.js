const express    = require('express');
const router     = express.Router();

// Models
const Todos = require('../models/todos');
const User  = require('../models/user');


router.get('/home', function(req, res, next) {

    if (req.user) {
        User.findById(req.user.id).populate('list').exec(function(err, user) {
            console.log(user);
            return res.render('index', { user: user });
        });
    } else {
        res.render('index');
    }

});

router.post('/home', function(req, res, next) {
    var incomingData = req.body;
    var tempTodos = JSON.parse(incomingData.post);
    console.log(req.user);
    var userId = req.user.id;
    console.log(userId);

    var newTodos = new Todos({
        title:  tempTodos.title,
        todos: tempTodos.todos
    });

    User.findById(userId, function(err, user) {
        if (err) {
            console.log(err);
        }

         newTodos.save(function(err) {
            if (err) {
                console.log(err);
            }

            user.list.push(newTodos);
            user.save();
            console.log('Success');
            return res.send(incomingData);
        });

    });

});

router.delete('/home', function(req, res, next) {
    var listId = req.body.id;
    console.log(req.body);

    Todos.findByIdAndRemove(listId, function(err, list) {
        if (err) {
            console.log(err);
        }

        res.send(req.body);

    });

});

router.get('/todos', function(req, res, next) {
    
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
