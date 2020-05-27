const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        fname: String,
        lname: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subject: {
        title: String,
        subjectId: String
    },
    students: [{}]
});

module.exports = mongoose.model('Tutor', tutorSchema);