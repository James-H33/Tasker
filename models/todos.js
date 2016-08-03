const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const todosSchema = new Schema({
    title: String,
    todos: { type: Array, "default": [] },
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('Todos', todosSchema);
