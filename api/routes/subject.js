const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Subject = require("../models/subject");

router.get("/", (req, res, next) => {
    Subject.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch( err => {
            console.logo(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/", (req, res, next) => {
    const subject = new Subject({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        studentsOffering: req.body.studentsOffering
    });
    subject
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                messaage: "Handling POST request to /subject",
                createdSubject: result,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.get("/:subjectId", (req, res, next) => {
    const id = req.params.subjectId;
    Subject.findById(id)
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


router.delete('/:subjectId', (req, res, next) => {
    const id = req.params.subjectId;
    Subject.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;
