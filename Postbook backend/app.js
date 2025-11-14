require('dotenv').config();

const path = require('path');
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const bp = require('body-parser')

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


const app = express();
app.use(cors());
app.use(express.static(path.join( __dirname,'../Postbook/postbook/dist/postbook')));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const routes = require('./routes');
app.use('/api', routes);

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})


