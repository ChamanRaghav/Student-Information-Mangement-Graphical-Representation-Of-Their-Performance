const express = require('express');
const router = express.Router();
//load Local Model

const User = require('../models/User');
var Mark = require('../models/mark');
var Student = require('../models/student.js');
const Semester = require('../models/sem');
var Course = require('../models/course');

router.get('/:id/addMarks',(req, res)=> {
    Student.findOne({_id: req.params.id}, (err, student)=>{
        if(err){
            console.log(err);
            req.flash('error_msg','Error in Getting The Student');
        }else{
            res.render('addMarks',{ student: student});
        }
    });  
});

router.get('/:idC/:idS',(req, res)=>{
    Student.find({dname: req.params.idC , sname: req.params.idS },(err, student)=> {
        res.render('student/semwise',{students: student, user: req.user});
    } );
});

router.get('/:id', (req, res)=> {
    Student.findById(req.params.id).populate('marks').exec((err, student)=>{
        if(err){
            console.log(err);
            req.flash('error_msg','Error in Getting The Student');
        }else{
            Mark.findById(student.marks._id).exec((err, marks)=>{
                res.render('showMarks',{ student: student, marks: marks});
            })
        }
    });
});

router.post('/:id/addMarks',(req, res)=>{
    Student.findOne({_id: req.params.id}, (err, student)=>{
        if(err){
            console.log(err);
            req.flash('error_msg','Error in Getting The Student');
        }else{
            Mark.create({
                sem: req.body.semester,
                sessional: req.body.sessional,
                sub1: {
                    subName: req.body.subName1,
                    marks: req.body.marks1
                },
                sub2: {
                    subName: req.body.subName2,
                    marks: req.body.marks2
                },
                sub3: {
                    subName: req.body.subName3,
                    marks: req.body.marks3
                },
                sub4: {
                    subName: req.body.subName4,
                    marks: req.body.marks4
                },
                sub5: {
                    subName: req.body.subName5,
                    marks: req.body.marks5
                }
            }, function(err, mark){
                if(err){
                    console.log(err);
                } else{

                    student.marks.push(mark);
                    student.save();
                    console.log(mark);
            res.redirect("/users/index");
        } 
    });   }
   });
});


module.exports = router;