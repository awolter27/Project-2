const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'In the 21st century everyone has to have an email! No exceptions!'],
        unique: [true, 'You already have an account with this email address'],
        lowercase: true
    }, 
    password: {
        type: String,
        required: [true, 'Who told you that you don\'t need a password?'],
        minLength: [6, 'A minimum 6 characters password is required']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password']
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        unique: [true, 'Be creative, this one already exists!']
    }
},
{
    timestamps: true
});

const User = mongoose.model('user', userSchema);

module.exports = User;