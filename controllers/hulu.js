const express = require('express');
const router = express.Router();
const { seedHulu, Hulu } = require('../models');

router.get('', async (req, res, next) => {
    try {
        const myHulus = await Hulu.find({});
        res.render('hulu/index.ejs', { Hulu: myHulus });
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
        res.render('hulu/show.ejs', { Hulu: myHulu });
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
})

router.post('', async (req, res, next) => {
    try {
        const newHulu = await Hulu.create(req.body);
        res.redirect('/hulu');
    } catch (err) {
        next();
        console.log(err);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const form = req.body;
        // const name = form.name;
        // const synopsis = form.synopsis;
        // const img = form.img;
        const { name, synopsis, img, genre } = form;
        const updatedShow = { name: name, synopsis: synopsis, img: img, genre: genre, seasons: [] }
        console.log(form);
        // console.log(updatedShow);
        for (let i = 0; i < form.seasons.length; i++) {
            let season = {
                year: 0,
                episodes: []
            }
            updatedShow.seasons.push(season);
        }
        // console.log(updatedShow);
        for (const key in form) {
            // console.log(`Form Key: ${key}: ${form[key]}`)
            if (key.slice(0, 4) === 'year') {
                updatedShow.seasons[key.slice(5)].year = Number(form[key])
            }
            if (key.slice(0, 8) === 'episodes') {
                updatedShow.seasons[key.slice(9)].episodes = form[key]
            }
        }
        // for of (iterates over values) and for in (iterates over properties) loop
        // console.log(form);
        console.log(updatedShow);
        for (let i = 0; i < updatedShow.seasons.length; i++) {
            console.log(updatedShow.seasons[i].episodes);
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