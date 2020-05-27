const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    studentsOffering:
        [{
            studentId: String,
            score: Number
        }]
});

module.exports = mongoose.model('Subject', subjectSchema);