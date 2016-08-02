const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todosSchema = new Schema({
    todos: { type: Array, "default": [] },
});

module.exports = mongoose.model('Todos', todosSchema);
