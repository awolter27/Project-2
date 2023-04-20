const express = require('express');
const router = express.Router();
const { seedHulu, Hulu, Comment, User } = require('../models');

router.get('', async (req, res, next) => {
    try {
        const myHulus = await Hulu.find({});
        let user;
        if(req.session.currentUser) {
            user = req.session.currentUser.username;
        }
        res.render('hulu/index.ejs', { Hulu: myHulus, user });
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/new', (req, res) => {
    res.render('hulu/new.ejs');
})

router.get('/seed', async (req, res, next) => {
    try {
        await Hulu.deleteMany({});
        await Hulu.insertMany(seedHulu);
        res.redirect('/hulu');
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const myHulu = await Hulu.findById(req.params.id);
        const huluComments = await Comment.find({hulu: myHulu._id});
        // displaying a username of a person who left a comment. Thank you, Eric!
        let huluCommentUsers = [];
        for(let i = 0; i < huluComments.length; i++) {
            let user = await User.findById(huluComments[i].user);
            huluCommentUsers.push(user.username);
        };
        res.render('hulu/show.ejs', { Hulu: myHulu, huluComments, huluCommentUsers });
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/:id/edit', async (req, res, next) => {
    try {
        const huluToBeEdited = await Hulu.findById(req.params.id);
        res.render('hulu/edit.ejs', { Hulu: huluToBeEdited });
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/:id/delete', async (req, res, next) => {
    try {
        const huluToBeDeleted = await Hulu.findById(req.params.id);
        res.render('hulu/delete.ejs', { Hulu: huluToBeDeleted });
    } catch (err) {
        next();
        console.log(err);
    }
});

// route for comments on a single show
router.post('/:id/comments', async(req, res, next) => {
    try {
        let newComment = req.body;
        newComment.user = req.session.currentUser.id;
        newComment.hulu = req.params.id;
        await Comment.create(newComment);
        res.redirect(`/hulu/${req.params.id}`);
    } catch(err) {
        console.log(err);
        next();
    }
});

router.post('', async (req, res, next) => {
    try {
        const form = req.body;
        const { name, synopsis, img, genre } = form;
        const newShow = { name: name, synopsis: synopsis, img: img, genre: genre, seasons: [{year: 0, episodes: []}] }
        const newHulu = await Hulu.create(newShow);
        res.redirect('/hulu');
    } catch (err) {
        next();
        console.log(err);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const form = req.body;
        const { name, synopsis, img, genre } = form;
        const updatedShow = { name: name, synopsis: synopsis, img: img, genre: genre, seasons: [] }
        for (let i = 0; i < form.seasons.length; i++) {
            let season = {
                year: 0,
                episodes: []
            }
            updatedShow.seasons.push(season);
        }
        for (const key in form) {
            if (key.slice(0, 4) === 'year') {
                updatedShow.seasons[key.slice(5)].year = Number(form[key])
            }
            if (key.slice(0, 8) === 'episodes') {
                updatedShow.seasons[key.slice(9)].episodes = form[key]
            }
        }
        const updatedHulu = await Hulu.findByIdAndUpdate(req.params.id, updatedShow);
        res.redirect(`/hulu/${req.params.id}`);
    } catch (err) {
        next();
        console.log(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedHulu = await Hulu.findByIdAndDelete(req.params.id);
        res.redirect('/hulu');
    } catch (err) {
        next();
        console.log(err);
    }
})

module.exports = router;