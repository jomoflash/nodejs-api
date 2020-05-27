const mongoose = require('mongoose');

const guardianSchema = mongoose.Schema({
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
    ward: [{}] //should contain student objects
});

module.exports = mongoose.model('Guardian', guardianSchema);