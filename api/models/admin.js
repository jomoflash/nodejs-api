const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        fname: String,
        lname: String
    },
    email: {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Admin', adminSchema);