const express = require('express');
const router = express.Router();
const { seedNetflix, Netflix } = require('../models');

router.get('', async (req, res, next) => {
    try {
        const myNetflixes = await Netflix.find({});
        res.render('netflix/index.ejs', { Netflix: myNetflixes });
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
        res.render('netflix/show.ejs', { Netflix: myNetflix });
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