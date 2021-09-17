require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mountRoutes = require('./routes/index');
const app = express();

//Parse JSON 
app.use(express.json());

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

app.listen( process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
})

