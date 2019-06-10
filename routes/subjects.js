const express = require('express');
const router = express.Router();

var Subject = require('../models/subject');

router.get('/allSubjects',(req, res)=>{
    Subject.find({},(err, sub)=>{
        if(err){
            console.log('Subject Cann\'t Loaded Currently');
            res.redirect('/users/index');
        } else{
            res.render('subjects/allSubject',{ subject: sub});
        }
    }).sort({ date : -1 });
});

router.get('/addSub',(req, res)=> {
    res.render('subjects/addSub');
})

router.post('/addSub',(req, res)=>{
    Subject.create({
        branch: req.body.branch,
        semester: req.body.semester,
        name: req.body.name,
        subCode: req.body.subCode,
        teacher: req.body.teacher,
        form: req.body.form
    },(err, sub)=>{
        if(err){
          req.flash(
            'error_msg',
            `Subject Cann\'t Save Currently.`
            );
            console.log(sub);
            console.log('Subject Cann\'t Save Currently');
            res.redirect('/users/index');            
        } else{
            res.redirect('/subject/allSubjects');
        }
    });
});

// Student Update Finally_Ok
router.get('/:id', function(req, res){
    Subject.findOne({ _id : req.params.id },
       (err, subject) => {
      if (err){
        console.log("Error In Getting the file For Updation!");
        console.error(err);
                req.flash(
        'success_msg',
        `Details of ${subject.name} is Successfully Updated.`
        );
        req.flash(
            'success_msg',
            `Details of ${subject.name} is Successfully Updated.`
            );
            res.redirect('/subject/allSubjects');
        
      } else{
        res.render('subjects/changeSub', { subject: subject, user: req.user  });
      }
    });
  });
  router.put('/edit/:id', function(req, res){
    Subject.findOneAndUpdate( {_id :req.params.id } ,
      { $set :{
        branch: req.body.branch,
        semester: req.body.semester,
        name: req.body.name,
        subCode: req.body.subCode,
        teacher: req.body.teacher,
        form: req.body.form
    } } ,
       (err, subject) => {
      if (err){
        console.error(err);
        console.log("Error Occures in Updating the Subject Details!!");
      } else{
        req.flash(
        'success_msg',
        `Details of ${subject.name} is Successfully Updated.`
        );
        res.redirect('/subject/allSubjects');
      }
    });
  });

// Delete The Student(Final_Ok)
router.delete("/:id", function(req,res){
Subject.findByIdAndRemove(req.params.id, function(err, subject){
    if(err){
        console.log("Error in Deleting The selected Student");
        res.redirect('/users/index');
        }
        else{
        req.flash(
            'error_msg',
            `${subject.name} is successfully Deleted`
        );
        res.redirect('/subject/allSubjects');
    }
    });
    
});

module.exports = router;