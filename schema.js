const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    StudentId: Number,
    Name: String,
    Roll: Number,
    Birthday: String,
    Address: String
},{timestamps:true});

module.exports = mongoose.model('student', StudentSchema, 'Students');
