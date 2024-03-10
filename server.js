
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const api = require('./api');
const port = 3000;
const app = express();
app.use(cors())//CORS Middleware
app.use(bodyParser.json())

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.get('/', (req, res) => { //set index route
    res.send("Invalid Endpoint")
})
app.use('/api', api);
