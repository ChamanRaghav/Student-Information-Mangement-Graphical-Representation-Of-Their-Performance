const express = require('express');
const router = express.Router();
//load Local Model

const User = require('../models/User');
var Mark = require('../models/mark');
const Subject = require('../models/subject');
var Student = require('../models/student.js');
const Semester = require('../models/sem');
var Course = require('../models/course');




router.get('/addSem/:id/',(req, res)=> {
    Course.findById(req.params.id, function(err, courses){
        if(err){
            console.log(err);
            res.redirect("/users/index");
        }
        else{
    res.render('./courses/addSem', {course : courses, user: req.user});
        }
    });
});

router.post('/sem/:id', (req, res)=> {
 Course.findOne({ _id : req.params.id }, 
     function(err, course){
    if(err){
        console.log(err);
        res.redirect("/users/index");
    }
    else{
        Semester.create({
            semester : req.body.semester}, function(err, sem){
            if(err){
                console.log(err);
            } else{
                course.semesters.push(sem);
                course.save();
                res.redirect('/courses/sem/'+course._id+'/'+sem._id);
            }
        });
      }
    });
});

router.get('/sem/:idC/:idS',(req, res)=> {
    Course.findById(req.params.idC, function(err, courses){
        if(err){
            console.log(err);
            res.redirect("/users/index");
        }
        else{

        Semester.findById(req.params.idS, (err,sems)=> {
            if(err){
                console.log(err);
                res.redirect("/users/index");
            }
            else{
            Student.find({
                dname: courses.name,
                sname: sems.semester 
            }, (err, students)=>{
                if(err){
                    console.log(err);
                    res.redirect("/users/index");
                }
                else{
                    res.render('./courses/sem', {students: students, course : courses,sem :sems, user: req.user});
                }
            }).sort({ name: 1 });
        }
            })
        }
    });
});

router.get('/course/:id', (req, res) => {
    Course.findOne({ _id : req.params.id },
      (err, courses) => {
     if (err){
       console.log("Error In Getting The student");
       res.redirect('/user/index');
     } else{
    res.render('./courses/course', { course: courses, user : req.user});
     }
   });
  });

  router.get('/sem/addSub/:idC/:idS',(req, res)=> {
    Course.findById(req.params.idC, function(err, courses){
        if(err){
            console.log(err);
            res.redirect("/users/index");
        }
        else{
        Semester.findById(req.params.idS, (err,sems)=> {
             res.render('./courses/addSub', {course : courses,sem :sems, user: req.user});

            });
        }
    });
});

router.post('/sem/addSub/:idC/:idS', (req, res)=> {
    Course.findOne({ _id : req.params.idC }, 
        function(err, course){
       if(err){
           console.log(err);
           res.redirect("/users/index");
       }
       else{
        Semester.findOne({ _id : req.params.idS }, 
            function(err, sem){
           if(err){
               console.log(err);
               res.redirect("/users/index");
           }
           else{
           Subject.create({
               name:req.body.name,
                subCode: req.body.subCode,
                teacher: req.body.teacher,
                form: req.body.form
            }, function(err, sub){
               if(err){
                   console.log(err);
               } else{
                   sem.subjects.push(sub);
                   sem.save();
                   res.redirect('/courses/sem/subList/'+course._id+'/'+sem._id);
               }
           });
         }
       });
    }
   });
});

router.get('/sem/subList/:idC/:idS', (req, res)=> {
    Course.findOne({ _id : req.params.idC }, 
        function(err, courses){
       if(err){
           console.log(err);
           res.redirect("/users/index");
       }
       else{
        Semester.findOne({ _id : req.params.idS }, 
            function(err, sems){
           if(err){
               console.log(err);
               res.redirect("/users/index");
           }
           else{
           Subject.find({}, 
            function(err, subs){
           if(err){
               console.log(err);
               res.redirect("/users/index");
           }
           else{
res.render('./courses/sub', {course : courses,sem :sems, sub: subs ,subject:sems.subjects, user: req.user});

               }
           });
         }
       });
    }
   });
});


router.get('/sem/addResult/:idC/:idS', (req, res)=> {
    Course.findOne({ _id : req.params.idC }, 
        function(err, courses){
       if(err){
           console.log(err);
           res.redirect("/users/index");
       }
       else{
        Semester.findOne({ _id : req.params.idS }, 
            function(err, sems){
           if(err){
               console.log(err);
               res.redirect("/users/index");
           }
           else{
           Subject.find({}, 
            function(err, subs){
           if(err){
               console.log(err);
               res.redirect("/users/index");
           }
           else{
res.render('./courses/addResult', {course : courses,sem :sems, sub: subs ,subject:sems.subjects, user: req.user});

               }
           });
         }
       });
    }
   });
});

// router.get('/sem/addResultForm/:idC/:idS', (req, res)=> {
//     Course.findOne({ _id : req.params.idC }, 
//         function(err, courses){
//        if(err){
//            console.log(err);
//            res.redirect("/users/index");
//        }
//        else{
//         Semester.findOne({ _id : req.params.idS }, 
//             function(err, sems){
//            if(err){
//                console.log(err);
//                res.redirect("/users/index");
//            }
//            else{
//                 Student.find({
//             dname: courses.name,
//             sname: sems.semester 
//         }, (err, students)=>{
//             if(err){
//                 console.log(err);
//                 res.redirect("/users/index");
//             }
//             else{

//                 Subject.find({}, 
//                     function(err, subs){
//                    if(err){
//                        console.log(err);
//                        res.redirect("/users/index");
//                    }
//                    else{
//         res.render('./courses/addResultForm', {course : courses, students: students, sem :sems, sub: subs ,subject:sems.subjects, user: req.user});
//             }
//         });
//                }
//            });
//          }
//        });
//     }
//    });
// });


module.exports = router;