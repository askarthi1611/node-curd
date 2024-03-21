const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./schema');
const fs = require('fs');
const pdf = require('html-pdf');

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


router.post('/savepdf', async function (req, res) {
    try {
        const newStudent = new StudentModel({
            StudentId: req.body.StudentId,
            Name: req.body.Name,
            Roll: req.body.Roll,
            Birthday: req.body.Birthday,
        });

        const htmlContent = `<html><body><h1>${req.body.StudentId}</h1><p>${req.body.Name}</p></body></html>`;
        const outputPath = 'output.pdf';

        pdf.create(htmlContent).toFile(outputPath, async function(err, _) {
            if (err) {
                console.error('Error creating PDF:', err);
                res.status(500).send('Error creating PDF');
                return;
            }

            try {
                const base64String = await pdfToBase64(outputPath);
                res.send({ "base64": base64String });
            } catch (error) {
                console.error('Error converting PDF to base64:', error);
                res.status(500).send('Error converting PDF to base64');
            }
        });
    } catch (err) {
        console.error('Error inserting student data:', err);
        res.status(500).send("Error inserting student data" + '\n' + err);
    }
});
var options = { format: 'A4' };

router.post('/savehtmlpdf', async function (req, res) {
    try {
        const htmlContent = `${req.body.html}`;
        const outputPath = `${req.body.name}.pdf`;
        pdf.create(htmlContent,options).toFile(outputPath, async function(err, _) {
            if (err) {
                console.error('Error creating PDF:', err);
                res.status(500).send('Error creating PDF');
                return;
            }
            try {
                const base64String = await pdfToBase64(outputPath);
                res.send({ "base64": base64String });
            } catch (error) {
                console.error('Error converting PDF to base64:', error);
                res.status(500).send('Error converting PDF to base64');
            }
        });
    } catch (err) {
        console.error('Error inserting student data:', err);
        res.status(500).send("Error inserting student data" + '\n' + err);
    }
});

function pdfToBase64(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const base64Data = Buffer.from(data).toString('base64');
            resolve(base64Data);
        });
    });
}

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
