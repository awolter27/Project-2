const express = require('express');
const router = express.Router();
const { Disney } = require('../models');

//login page
router.get('', (req, res) => {
    res.render('login.ejs')
})

//home page
router.get('/home', async (req, res, next) => {
    try{
        console.log(req.session)
        let myDisneys;
            myDisneys = await Disney.find({});
    } catch (err) {
        console.log(err);
        next();
    }
})

//new show
router.get('/new', (req, res) => {
    res.render('disney/new.ejs')
})

router.post('', async (req, res, next) => {
    try {
        const newShow = await Disney.create(req.body);
        console.log(newShow);
        res.redirect('/shows')
    } catch(err) {
        console.log(err) 
        next();
    }
})

//new episode
router.get('/:id/new', (req, res) => {
    res.render('new.ejs')
})

//edit show page
router.get('/:id/edit', async (req, res, next) => {
    try {
        const showToBeEdited = await Disney.findById(req.params.id);
        console.log(showToBeEdited )
    }
})

//delete show

//index show page

//show episodes page


//seeded
router.get('/seedDisney', async (req, res, next) => {
    try{
        await Disney.deleteMany({});
        await Disney.insertMany(seedDisney);
        res.redirect('/shows');
    }catch(err) {
        console.log(err);
        next();
    }
})

module.exports = router;