'use strict';
require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const dbUrl = `mongodb://localhost:${process.env.MONGODB_PORT}/sber`;
mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const userRoutes = require('./api/routes/user');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);

app.use((req, res, next) => {
   const error = new Error('404. Not found');
   error.status(404);
   next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
       error: {
           message: error.message
       }
    });
});

// app.listen(process.env.PORT, () => {
//     console.log(`Server listening at port ${process.env.PORT}`);
// });

module.exports = app;