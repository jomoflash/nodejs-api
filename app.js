const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./api/routes/admin');
const subjectRoutes = require('./api/routes/subject');
const studentRoutes = require('./api/routes/student');
const tutorRoutes = require('./api/routes/tutor');
const guardianRoutes = require('./api/routes/guardian');

/*
    Connecting to the Database
    This connects mongoose to the remote database
    You can switch between local and remote by outcommenting one while leaving the other.

*/

mongoose.connect(
    'mongodb+srv://Jomo2468:Jomo2468@school-aider-sk96w.mongodb.net/test?retryWrites=true&w=majority',
    {// useMongoClient: true 
        useNewUrlParser: true
    });
/* 
mongoose.connect('mongodb://localhost/testDatabase');
mongoose.Promise = global.Promise; //mongoose version of promise is deprecated, use the global version

 */
app.use(morgan('dev')); //middleware for logging to the console
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for handling request body

/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req, method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
*/


//Routes which should handle requests
app.use('/subject', subjectRoutes);
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.use('/tutor', tutorRoutes);
app.use('/guardian', guardianRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;
