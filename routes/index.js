const express = require('express');
const router = express.Router();
const Todos = require('../models/todos');

router.get('/', function(req, res, next) {
    Todos.find({}, function(err, todos) {
        if (err) {
            console.log(err);
        }
        res.render('index', { todos: todos });
    })
});

router.post('/', function(req, res, next) {
    var data = req.body;
    console.log(data);
    res.send(data);
});

module.exports = router;
