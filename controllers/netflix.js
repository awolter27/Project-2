const express = require('express');
const router = express.Router();
const { seedNetflix, Netflix } = require('../models');

router.get('', async (req, res, next) => {
    try {
        const myNetflixes = await Netflix.find({});
        let user;
        if(req.session.currentUser) {
            user = req.session.currentUser.username;
        }
        res.render('netflix/index.ejs', { Netflix: myNetflixes, user });
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/new', (req, res) => {
    res.render('netflix/new.ejs');
})

router.get('/seed', async (req, res, next) => {
    try {
        await Netflix.deleteMany({});
        await Netflix.insertMany(seedNetflix);
        res.redirect('/netflix');
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const myNetflix = await Netflix.findById(req.params.id);
        let usersNetflix = false;
        if(req.session.currentUser) {
            if(req.session.currentUser.id == myNetflix.user.toString()) {
                usersNetflix = true
            }
        }
        res.render('netflix/show.ejs', { Netflix: myNetflix, usersNetflix });
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/:id/edit', async (req, res, next) => {
    try {
        const netflixToBeEdited = await Netflix.findById(req.params.id);
        res.render('netflix/edit.ejs', { Netflix: netflixToBeEdited });
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/:id/delete', async (req, res, next) => {
    try {
        const netflixToBeDeleted = await Netflix.findById(req.params.id);
        res.render('netflix/delete.ejs', { Netflix: netflixToBeDeleted });
    } catch (err) {
        next();
        console.log(err);
    }
})

router.post('', async (req, res, next) => {
    try {
        const newNetflix = await Netflix.create(req.body);
        res.redirect('/netflix');
    } catch (err) {
        next();
        console.log(err);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const updatedNetflix = await Netflix.findByIdAndUpdate(req.params.id, req.body);
        if(req.session.currentUser && req.session.currentUser.id == updatedNetflix.user.toString()) {
            res.render('netflix/edit.ejs', { Netflix: updatedNetflix })
        } else {
            res.redirect()
        }
        res.redirect(`/netflix/${req.params.id}`);
    } catch (err) {
        next();
        console.log(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedNetflix = await Netflix.findByIdAndDelete(req.params.id);
        res.redirect('/netflix');
    } catch (err) {
        next();
        console.log(err);
    }
})

module.exports = router;