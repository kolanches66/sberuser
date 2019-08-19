'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    login: String,
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);