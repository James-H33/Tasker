const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const bcrypt    = require('bcrypt-nodejs');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    list: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todos"
      }
    ]
});

// Function takes password and encrypts it
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

// Function compares password users has submitted to sign in and compares it with the one that is stores in the database
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userSchema);
