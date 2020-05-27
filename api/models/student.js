const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
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
    subjects: [{ title: String, subjectId: String, score:Number }]
});

module.exports = mongoose.model('Student', studentSchema);