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
    User.findById(req.params.userId)
        .select('_id name login')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: 'User not found by ID' })
            }
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
    user.save()
        .then(result => {
            res.status(201).json({ id: result._id })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;