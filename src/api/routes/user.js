'use strict';
require('dotenv/config');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {

    User.find()
        .then(docs => res.status(200).json(docs))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});

router.get('/:userId', (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(200).json({ message: 'Invalid user id' });
    }

    User.findById(req.params.userId)
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

    const error = User.validateUser(user._id, req.body.name, req.body.login);
    if (error) {
        return res.status(200).json({message: error});
    }

    user.save()
        .then(result => {
            res.status(201).json({ id: result._id });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.put('/:userId', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(200).json({ message: 'Invalid user id' });
    }

    const error = User.validateUser(req.params.userId, req.body.name, req.body.login);
    if (error) {
        return res.status(200).json({message: error});
    }

    User.findOneAndUpdate({ _id: req.params.userId }, {
        $set: {
            name: req.body.name,
            login: req.body.login
        }
    }, { new: true }, (err, doc) => {
        res.status(200).json(doc);
    });

});

module.exports = router;