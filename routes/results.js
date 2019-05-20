const express = require('express');
const router = express.Router();
//load Local Model

const User = require('../models/User');
var Mark = require('../models/mark');
var Student = require('../models/student.js');
const Semester = require('../models/sem');
var Course = require('../models/course');

router.get('/addResult/:id/:idC',(req, res)=>{
    Student.findOne({_id: req.params.id},(err, student)=>{

    })
})




module.exports = router;