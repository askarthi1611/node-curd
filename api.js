const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./schema');
let password = 'cc_eFkp2pP_Ehf7'
// Connecting to database
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://sk:cc_eFkp2pP_Ehf7@cluster0.yrdr0.mongodb.net?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 });
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected..')
})
module.exports = router;

router.post('/save', async function (req, res) {
    try {
        const newStudent = new StudentModel({
            StudentId: req.body.StudentId,
            Name: req.body.Name,
            Roll: req.body.Roll,
            Birthday: req.body.Birthday,
        });

        const savedData = await newStudent.save();
        res.send("Data inserted");
    } catch (err) {
        // console.error(err);
        res.status(500).send("Error inserting student data"+'\n'+err);
    }
});


router.get('/findall', async function (req, res) {
    try {
        const data = await StudentModel.find();
        res.send(data);
    } catch (err) {
        // console.error(err);
        res.status(500).send("Error finding students"+'\n'+err);
    }
});

router.get('/findid', async function (req, res) {
    try {
        const data = await StudentModel.findOne({ StudentId: req.body.StudentId }).exec();
        res.send(data);
    } catch (err) {
        // console.error(err);
        res.status(500).send("Error fetching student data"+'\n'+err);
    }
});

router.post('/delete', async function (req, res) {
    try {
        const result = await StudentModel.deleteOne({ StudentId: req.body.StudentId });
        res.send(result);
    } catch (err) {
        // console.error(err);
        res.status(500).send("Error deleting student data"+'\n'+err);
    }
});

router.post('/update', async function (req, res) {
    try {
        console.log(req.body)
        const updatedData = await StudentModel.findByIdAndUpdate(
            req.body._id,
            {
                StudentId: req.body.StudentId,
                Name: req.body.Name,
                Roll: req.body.Roll,
                Birthday: req.body.Birthday,
            },
            { new: true } // To return the updated document
        );

        console.log("Data updated!");
        res.send(updatedData);
    } catch (err) {
        // console.error(err);
        res.status(500).send("Error updating student data"+'\n'+err);
    }
});

