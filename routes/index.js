const express    = require('express');
const router     = express.Router();

// Models
const Todos = require('../models/todos');
const User  = require('../models/user');


router.get('/home', function(req, res, next) {
    Todos.findById('57a0acd592edee7c182e4b78', function(err, todos) {
        if (err) {
            console.log(err);
        }
        res.render('index', { todos: todos });
    });
});

router.post('/home', function(req, res, next) {
    var incomingData = req.body;
    var tempTodos = JSON.parse(incomingData.post);
    var userId = req.user.id;


    var newTodos = new Todos({
        todos: tempTodos
    });

    User.findById(userId, function(err, user) {
        if (err) {
            console.log(err);
        }

         newTodos.save(function(err) {
            if (err) {
                console.log(err);
            }

            user.comments.push(newTodos);
            user.save();
            console.log('Success');
            return res.send(incomingData);
        });
        
    });

});



module.exports = router;
