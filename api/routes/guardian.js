const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Guardian = require("../models/guardian");

// Returns all Guardian
router.get("/", (req, res, next) => {
    Guardian.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.logo(err);
            res.status(500).json({
                error: err
            });
        });
});

// Retrieve Guardian by id

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Guardian.findById(id)
        .exec()
        .then(doc => {
            console.log('From database', doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found for provided ID' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });

        });
});

// User Login route
router.post('/login', (req, res, next) => {
    Guardian.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        'secret key',
                        {expiresIn: '1h'}
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


// Create new Guardian
router.post("/signup", (req, res, next) => {
    Guardian.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'email already exist'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new Guardian({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name, 
                            email: req.body.email,
                            password: hash,
                            ward: req.body.ward 
                        });
                        user
                            .save()
                            .then((result) => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created',
                                    Created: result
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });

                    }
                });


            }
        });

});


// Delete adnmin
router.delete('/:id', (req, res, next) => {
    Guardian.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
