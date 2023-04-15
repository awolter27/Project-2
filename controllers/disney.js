const express = require('express');
const router = express.Router();
const { seedDisney, Disney } = require('../models');

//home page & login page
//I think maybe this should go in the server since it will be the same for all three?

//index show page
router.get('', async (req, res, next) => {
    try {
        const myDisneys = await Disney.find({});
        res.render('disney/index.ejs', { Disney: myDisneys });
    } catch (err) {
        next();
        console.log(err);
    }
})

//seeded
router.get('/seed', async (req, res, next) => {
    try{
        await Disney.deleteMany({});
        await Disney.insertMany(seedDisney);
        res.redirect('/disney');
    }catch(err) {
        console.log(err);
        next();
    }
})

//single show page
router.get('/:id', async (req, res, next) => {
    try {
        const myDisney = await Disney.findById(req.params.id);
        res.render('disney/show.ejs', { myDisney });
    } catch (err) {
        next();
        console.log(err);
    }
})

//new show
router.get('/new', (req, res) => {
    res.render('disney/new.ejs')
})

router.post('', (req, res) => {
        const newShow = Disney.create(req.body);
        console.log(newShow);
        res.redirect('/disney/index.ejs');
})


//new episode
router.get('/:id/new', (req, res) => {
    res.render('new.ejs')
})


//edit a show page
router.get('/:id/edit', async (req, res, next) => {
    try {
        const showToBeEdited = await Disney.findById(req.params.id);
        console.log(showToBeEdited);
        res.render('Disney/edit.ejs', {Disney: showToBeEdited})
    } catch(err) {
        console.log(err);
        next()
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const updatedShow = await Disney.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/disney/${req.params.id}`)
    } catch(err) {
        console.log(err);
        next();
    }
})

//delete a show
router.get('/:id/delete', async (req, res, next) => {
    try {
        const showToBeDeleted = await Disney.findById(req.params.id);
        res.render('disney/delete.ejs' , {Disney: showToBeDeleted})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const deletedItem = await Disney.findByIdAndDelete(req.params.id);
        res.redirect('/disney')
    }catch (err) {
        console.log(err);
        next();
    }
})



//show episodes page



module.exports = router;