const express = require('express');
const router = express.Router();
const { seedDisney, Disney, User, Comment } = require('../models');

//home page & login page
//I think maybe this should go in the server since it will be the same for all three?

//index show page
router.get('', async (req, res, next) => {
    try {
        const myDisneys = await Disney.find({});
        let user;
        if(req.session.currentUser) {
            user = req.session.currentUser.username;
        }
        res.render('disney/index.ejs', { Disney: myDisneys, user });
    } catch (err) {
        next();
        console.log(err);
    }
})

//seeded
router.get('/seed', async (req, res, next) => {
    try {
        await Disney.deleteMany({});
        await Disney.insertMany(seedDisney);
        res.redirect('/disney');
    } catch (err) {
        console.log(err);
        next();
    }
});

// route for comments
router.post('/:id/comments', async(req, res, next) => {
    try {
        let newComment = req.body;
        newComment.user = req.session.currentUser.id;
        newComment.disney = req.params.id;
        await Comment.create(newComment);
        res.redirect(`/disney/${req.params.id}`);
    } catch(err) {
        console.log(err);
        next();
    }
});

//single show page
router.get('/:id', async (req, res, next) => {
    try {
        const myDisney = await Disney.findById(req.params.id);
        const disneyComments = await Comment.find({disney: myDisney._id});
        // algo to display a username of a person who left a comment
        let disneyCommentUsers = [];
        for(let i = 0; i < disneyComments.length; i++) {
            let user = await User.findById(disneyComments[i].user);
            disneyCommentUsers.push(user.username);
        };
        res.render('disney/show.ejs', { myDisney, disneyComments, disneyCommentUsers });
    } catch (err) {
        next();
        console.log(err);
    }
});

//new show
router.get('/new', (req, res) => {
    res.render('disney/new.ejs')
});


router.post('', async (req, res, next) => {
    try {
        const form = req.body;
        const { name, synopsis, img, genre } = form;
        const newShow = { name: name, synopsis: synopsis, img: img, genre: genre, seasons: [{year: 0, episodes: []}] }
        const newDisney = await Disney.create(newShow);
        res.redirect('/disney');
    } catch (err) {
        next();
        console.log(err);
    }
});

//new episode
router.get('/:id/new', (req, res) => {
    res.render('new.ejs')
})


//edit a show page
router.get('/:id/edit', async (req, res, next) => {
    try {
        const showToBeEdited = await Disney.findById(req.params.id);
        console.log(showToBeEdited);
        res.render('Disney/edit.ejs', { Disney: showToBeEdited })
    } catch (err) {
        console.log(err);
        next()
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
        const updatedDisney = await Disney.findByIdAndUpdate(req.params.id, updatedShow);
        res.redirect(`/disney/${req.params.id}`);
    } catch (err) {
        next();
        console.log(err);
    }
});

//delete a show
router.get('/:id/delete', async (req, res, next) => {
    try {
        const showToBeDeleted = await Disney.findById(req.params.id);
        res.render('disney/delete.ejs', { Disney: showToBeDeleted })
    } catch (err) {
        console.log(err);
        next();
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedItem = await Disney.findByIdAndDelete(req.params.id);
        res.redirect('/disney')
    } catch (err) {
        console.log(err);
        next();
    }
});



//show episodes page



module.exports = router;