const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const todosSchema = new Schema({
    title: String,
    todos: { type: Array, "default": [] }
});

module.exports = mongoose.model('Todos', todosSchema);
