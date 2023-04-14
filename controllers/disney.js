const express = require('express');
const router = express.Router();
const { seedDisney,Disney } = require('../models');

//login page
// router.get('/', (req, res) => {
//     res.render('login.ejs')
// })

//home page
//I think maybe this should go in the server since it will be all three?

//index show page
router.get('/', (req, res,) => {
    res.render('disney/index.ejs')
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
        res.render('delete.ejs' , {Disney: showToBeDeleted})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.delete('/disney/:id', async (req, res, next) => {
    try{
        Disney.splice(req.params.id, 1)
        res.redirect('/disney/index.ejs')
    }catch (err) {
        console.log(err);
        next();
    }
})


//single show page
router.get('/:id', (req, res) => {
    const singleShow = Disney[req.params.id];
    res.render('views/disney/show.ejs', {singleShow, idx: req.params.id})
})

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