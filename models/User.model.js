// User model here
//steps:
//mongoose + Schema + model + export;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        unique: true
    },
    password: String
})

//caveat: type "unique" is not a validator, but a Mongo helper to create unique indexes 

const User = mongoose.model('User', userSchema);

module.exports = User;

//next: register option from index => sends to /register