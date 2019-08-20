'use strict';
require('dotenv/config');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
        .select('_id name login')
        .exec()
        .then(docs => res.status(200).json(docs))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(200).json({ message: 'Invalid user id' });
    }

    User.findById(req.params.userId)
        .select('_id name login')
        .exec()
        .then(doc => {
            if (doc === null) {
                return res.status(200).json({ message: 'User not found' });
            }
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
})

router.post('/', (req, res) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        login: req.body.login,
    });

    const validate = user.validateSync();
    for (let field of (!validate ? [] : [validate.errors['name'], validate.errors['login']])) {
        return field
            && field.message
            && res.status(200).json({message: field.message});
    }

    user.save()
        .then(result => {
            res.status(201).json({ id: result._id })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;