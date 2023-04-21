const express = require('express');
const router = express.Router();
const { seedNetflix, Netflix, Comment, User } = require('../models');

router.get('', async (req, res, next) => {
    try {
        const myNetflixes = await Netflix.find({});
        let user;
        if (req.session.currentUser) {
            user = req.session.currentUser.username;
        }
        res.render('netflix/index.ejs', { Netflix: myNetflixes, user });
    } catch (err) {
        next();
        console.log(err);
    }
});

router.get('/new', (req, res) => {
    res.render('netflix/new.ejs');
});

router.get('/seed', async (req, res, next) => {
    try {
        await Netflix.deleteMany({});
        await Netflix.insertMany(seedNetflix);
        res.redirect('/netflix');
    } catch (err) {
        next();
        console.log(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const myNetflix = await Netflix.findById(req.params.id);
        const netflixComments = await Comment.find({ netflix: myNetflix._id });
        // displaying a username of a person who left a comment. Thank you, Eric!
        let netflixCommentUsers = [];
        for (let i = 0; i < netflixComments.length; i++) {
            let user = await User.findById(netflixComments[i].user);
            netflixCommentUsers.push(user.username);
        };
        res.render('netflix/show.ejs', { Netflix: myNetflix, netflixComments, netflixCommentUsers });
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
});

// route for comments on a single show
router.post('/:id/comments', async (req, res, next) => {
    try {
        let newComment = req.body;
        newComment.user = req.session.currentUser.id;
        newComment.netflix = req.params.id;
        await Comment.create(newComment);
        res.redirect(`/netflix/${req.params.id}`);
    } catch (err) {
        console.log(err);
        next();
    }
});

router.post('', async (req, res, next) => {
    try {
        const form = req.body;
        const { name, synopsis, img, genre } = form;
        const newShow = { name: name, synopsis: synopsis, img: img, genre: genre, seasons: [{ year: 0, episodes: [] }] }
        const newNetflix = await Netflix.create(newShow);
        res.redirect('/netflix');
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
                updatedShow.seasons[key.slice(5)].year = Number(form[key]);
            }
            if (key.slice(0, 8) === 'episodes') {
                updatedShow.seasons[key.slice(9)].episodes = form[key];
            }
        }
        const updatedNetflix = await Netflix.findByIdAndUpdate(req.params.id, updatedShow);
        res.redirect(`/netflix/${req.params.id}`);
    } catch (err) {
        next();
        console.log(err);
    }
})

// delete a specific season
router.put('/:id/:seasons', async (req, res, next) => {
    try {
        const deletedNetflixSeason = await Netflix.findById(req.params.id);
        deletedNetflixSeason.seasons.splice(req.params.seasons, 1);
        await Netflix.findByIdAndUpdate(req.params.id, deletedNetflixSeason);
        res.redirect('/netflix');
    } catch (err) {
        next();
        console.log(err);
    }
})

// delete a specific episode
router.put('/:id/episodes/:seasons/:episodes', async (req, res, next) => {
    try {
        const deletedNetflixEpisode = await Netflix.findById(req.params.id);
        deletedNetflixEpisode.seasons[req.params.seasons].episodes.splice(req.params.episodes, 1);
        await Netflix.findByIdAndUpdate(req.params.id, deletedNetflixEpisode);
        res.redirect('/netflix');
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