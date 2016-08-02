const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todosSchema = new Schema({
    todos: [
        {
            todoText: String,
            completed: Boolean
        }
    ],
});

module.exports = mongoose.model('Todos', todosSchema);
