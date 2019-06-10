const express = require('express');
const router = express.Router();
//load Local Model

const User = require('../models/User');
var Mark = require('../models/mark');
var Student = require('../models/student.js');
var Subject = require('../models/subject');
const Semester = require('../models/sem');
var Course = require('../models/course');



router.get('/:id/addMarks',(req, res)=> {
    Student.findOne({_id: req.params.id}, (err, student)=>{
        if(err){
            console.log(err);
            req.flash('error_msg','Error in Getting The Student');
        }else{
            Subject.find({branch:student.dname , semester: student.sname},(err, subject)=>{
                if(err){
                    console.log(err);
                    req.flash('error_msg','Error in Getting The Subject');
                } else {  
            res.render('addMarks',{ student: student, subject: subject});
        }
    });
}  
});
});

router.get('/studentDetails/:id', (req, res)=> {
    Student.findById(req.params.id).populate('marks').exec((err, student)=>{
    if(err){
        console.log(err);
        req.flash('error_msg','Error in Getting The Student');
            } else {   
                console.log("successfully Showing Student Personal Detail");
            res.render("student/studentDetail",{ student: student});
            }
        })
});

router.get('/:id', (req, res)=> {
    Student.findById(req.params.id).populate('marks').exec((err, student)=>{
    if(err){
        console.log(err);
        req.flash('error_msg','Error in Getting The Student');
    }else{
    Subject.find({branch:student.dname , semester: student.sname},(err, subject)=>{
    if(err){
        console.log(err);
        req.flash('error_msg','Error in Getting The Subject');
    } else {  
        Mark.findById(student.marks._id).exec((err, marks)=>{
            
            res.render('showMarks',{ student: student, marks: marks, subject: subject});
        })
    }
});
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
                },
                sub6: {
                    subName: req.body.subName6,
                    marks: req.body.marks6
                }
            }, function(err, mark){
                if(err){
                    console.log(err);
                } else{

                    student.marks.push(mark);
                    student.save();
                    console.log(mark);
            res.redirect("/student/"+student._id);
        } 
    });   }
   });
});

router.delete("/:idStudent/:idMarks", function(req,res){
    Mark.findByIdAndRemove(req.params.idMarks, function(err, student){
        if(err){
          console.log("Error in Deleting The selected Student");
          res.redirect('/users/index');
          }
          else{
            req.flash(
              'error_msg',
              `${student.name}]'s Marks successfully Deleted`
            );
            res.redirect('/student/'+req.params.idStudent);
          }
    });  
});

router.get('/:idStudent/:idMarks/perform', (req, res)=> {
    Student.findById(req.params.idStudent).populate('marks').exec((err, student)=>{
    if(err){
        console.log(err);
        req.flash('error_msg','Error in Getting The Student');
    }else{
    Subject.find({branch:student.dname , semester: student.sname},(err, subject)=>{
    if(err){
        console.log(err);
        req.flash('error_msg','Error in Getting The Subject');
    } else {  
        Mark.findById({_id: req.params.idMarks}).exec((err, marks)=>{
            console.log(req.query.graphType);
            res.render('perform',{ student: student, marks: marks, graphType: req.query.graphType, subject: subject});
        })
    }
});
}
});
});

module.exports = router;