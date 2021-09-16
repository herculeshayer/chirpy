require('dotenv').config();
const express = require('express');
const mountRoutes = require('./routes');
const app = express();


mountRoutes(app);
//Parse JSON 
app.use(express.json());

//enable cors for all methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Credentials", true)
    next();
})



app.get('/', (req, res) => {
    res.send('hi')
})

app.listen( process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
})

