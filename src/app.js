require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const mountRoutes = require('./routes/index');
const cookieParser = require('cookie-parser');
const app = express();

const oneDay = 1000 * 60 * 60 * 24;

//Parse JSON 
app.use(express.json());
app.use(cookieParser());

/* 
    express session - save user sessions
        user sessions are saved inside mongodb chirpy as collection sessions
*/
app.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: oneDay
    }
}))

/*
    what: mount all endpoints
    why: this is a more streamline solution
        . instead of requiring several routes, 
        we define the routes in index.js &
        export them 
*/

mountRoutes(app);

//enable cors for all methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Credentials", true)
    next();
})

mongoose.connect(process.env.DATABASE_URL, (err) => {
    if(err) {
        console.log(err);
    }
})
mongoose.connection.once('connection', (res) => {
    console.log(res);
})


app.get('/', (req, res) => {
    res.send('hi')
})

const server = app.listen( process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
})

module.exports = server;