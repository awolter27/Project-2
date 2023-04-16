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
        console.log(newHulu);
        res.redirect('/hulu');
    } catch (err) {
        next();
        console.log(err);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const updatedHulu = await Hulu.findByIdAndUpdate(req.params.id, req.body);
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