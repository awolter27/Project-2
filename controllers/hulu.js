const express = require('express');
const router = express.Router();

let { hulu } = require('../models');

router.get('', async (req, res, next) => {
    try {
        const myHulus = await hulu.find({});
        res.render('hulu/index.ejs', { hulu: myHulus });
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
        await hulu.deleteMany({});
        await hulu.insertMany(seedHulu);
        res.redirect('/hulu');
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const myHulu = await hulu.findById(req.params.id);
        res.render('hulu/show.ejs', { hulu: myHulu });
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/:id/edit', async (req, res, next) => {
    try {
        const huluToBeEdited = await hulu.findById(req.params.id);
        res.render('hulu/edit.ejs', { hulu: huluToBeEdited });
    } catch (err) {
        next();
        console.log(err);
    }
})

router.get('/:id/delete', async (req, res, next) => {
    try {
        const huluToBeDeleted = await hulu.findById(req.params.id);
        res.render('hulu/delete.ejs', { hulu: huluToBeDeleted });
    } catch (err) {
        next();
        console.log(err);
    }
})

router.post('', async (req, res, next) => {
    try {
        const newHulu = await hulu.create(req.body);
        res.redirect('/hulu');
    } catch (err) {
        next();
        console.log(err);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const updatedHulu = await hulu.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/hulu/${req.params.id}`);
    } catch (err) {
        next();
        console.log(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedHulu = await hulu.findByIdAndDelete(req.params.id);
        res.redirect('/hulu');
    } catch (err) {
        next();
        console.log(err);
    }
})

module.exports = router;