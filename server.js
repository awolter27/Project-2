require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const userController = require('./controllers/users.js')
const huluController = require('./controllers/hulu.js');
const disneyController = require('./controllers/disney.js');
const netflixController = require('./controllers/netflix.js');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_DB_URI,
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);


app.get('/', (req, res) => {
    let user;
    if(req.session.currentUser) {
        user = req.session.currentUser.username;
    }
    res.render('home.ejs', { user });
});

app.use('', userController);
app.use('/hulu', huluController);
app.use('/disney', disneyController);
app.use('/netflix', netflixController);

app.get('/*', (req, res) => {
    res.render('404.ejs');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});