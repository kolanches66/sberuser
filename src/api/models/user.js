'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [40, 'Name must be 40 characters or less'],
    },
    login: {
        type: String,
        required: [true, "Login is required"],
        minlength: [2, 'Login must be at least 2 characters'],
        maxlength: [40, 'Login must be 40 characters or less'],
    },
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);