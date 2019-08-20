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

}, { collection: 'users', versionKey: false });

const User = module.exports = mongoose.model('User', userSchema);

module.exports.validateUser = (userId, name, login) => {

    const user = new User({
        _id: userId,
        name: name,
        login: login,
    });

    const validate = user.validateSync();
    for (let field of (!validate ? [] : [validate.errors['name'], validate.errors['login']])) {
        return field && field.message
    }

}

