const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'In 21st century everyone has to have an email! No exceptions!'],
        unique: [true, 'You already have an account with this email address']
    }, 
    password: {
        type: String,
        required: [true, 'Who told you that you don\'t need a password?']
    },
    username: {
        type: String,
        required: [true, 'Please anter your username'],
        unique: [true, 'Be createive, this one already exists!']
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;