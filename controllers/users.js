const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
// let loginError;

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/login', async (req, res, next) => {
    try {
        let user;
        const loggedInUser = req.body;
        let userExists = await User.exists({ email: loggedInUser.email });
        // checking if the user is valid
        if (!userExists) {
            userExists = await User.exists({ email: loggedInUser.email });
        };
        if (userExists) {
            user = await User.findOne({ email: loggedInUser.email });
            console.log(user);
        } else {
            // loginError = 'Wrong password. Please try again';
            res.redirect('/login');
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.currentUser = {
                id: user._id,
                username: user.username
            };
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
        next();
    }
});

router.post('/signup', async (req, res, next) => {
    try {
        const newUser = req.body;
        const rounds = process.env.SALT_ROUNDS;
        const salt = await bcrypt.genSalt(parseInt(rounds));
        console.log(`salt is ${salt}`);
        const hash = await bcrypt.hash(newUser.password, salt);
        console.log(`hash is ${hash}`);
        newUser.password = hash;
        await User.create(newUser);
        res.redirect('/login');
    } catch (err) {
        console.log(err);
        next();
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;