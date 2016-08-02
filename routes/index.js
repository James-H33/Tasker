const express = require('express');
const router = express.Router();
const Todos = require('../models/todos');

router.get('/', function(req, res, next) {
    Todos.findById('57a0acd592edee7c182e4b78', function(err, todos) {
        if (err) {
            console.log(err);
        }
        console.log(todos);
        res.render('index', { todos: todos });
    });
});

router.post('/', function(req, res, next) {
    var incomingData = req.body;
    var tempTodos = JSON.parse(incomingData.post);
    console.log(tempTodos);

    var newTodos = new Todos({
        todos: tempTodos
    });

    newTodos.save(function(err) {
        if (err) {
            console.log(err);
        }

        return res.send(incomingData);
    });

});



module.exports = router;
