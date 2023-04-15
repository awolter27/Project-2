const express = require('express');
const app = express();
const PORT = 4000;

const methodOverride = require('method-override');

const huluController = require('./controllers/hulu.js');
const disneyController = require('./controllers/disney.js');
const netflixController = require('./controllers/netflix.js');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));

app.use('/hulu', huluController);
app.use('/disney', disneyController);
app.use('/netflix', netflixController);

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/*', (req, res) => {
    res.render('404.ejs');
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})