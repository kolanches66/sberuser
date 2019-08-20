'use strict';
require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const dbUrl = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;
mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./api/routes/user');
app.use('/api/user', userRoutes);

app.use((req, res, next) => {
   const error = new Error('404. Not found');
   error.status = 404;
   next(error);
});

app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(error.status || 500);
    res.json({ message: error.message });
});

module.exports = app;