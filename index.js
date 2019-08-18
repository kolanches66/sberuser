'use strict';
require('dotenv/config');

const express = require('express');
// const mongoose = require('mongoose');

let users = {
    1: {
        id: '1',
        name: 'Ivanov',
        login: 'Ivanov-ii'
    },
    2: {
        id: '2',
        name: 'Ponomarev',
        login: 'kolanches'
    },
};

const router = express.Router();

// router.route('/user')
//     .post(UserCtrl.new);

router.get('/user', (req, res) => {
    return res.send(Object.values(users));
});

router.get('/user/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});

router.post('/user', (req, res) => {
    const id = uuidv4();
    const user = {
        id: id,
        name: req.body.name,
        login: req.body.login,
    }
    users[id] = user;
    return res.send(user);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost:27017/sber', { useNewUrlParser: true });
// let db = mongoose.connection;
//
// if (!db) {
//     console.log('Error connecting db');
// } else {
//     console.log('Db connected successfully');
// }

app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});