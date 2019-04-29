const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
var Mark = require('../models/mark');
var Student = require('../models/student.js');
var Course = require('../models/course');

const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

//Get List Of Student(Final_Ok)
router.get("/index", function(req, res){
  Student.find({}, function(err, students){
  if (err){
  console.log("Error!")
  }
  else {
    res.render('index',{students : students , user: req.user });
  }
  }).sort({ name : 1});
});

  router.get('/contact', function(req, res){
    console.log(req.query);
    res.render('contact',{qs: req.query,  user: req.user });
  });
  router.post('/contact', function(req, res){
    console.log(req.body);
    res.render('contact-success',{ data:req.body,  user: req.user  });
  });

  // Add a New Student(Final_Ok)
  router.get('/add', function(req, res){
    res.render('add',{ user: req.user });
  });
  router.post('/add', function(req, res){
    Student.create(req.body, function(err, students){
      if(err){
        console.log("Error in Saving Student");
        res.render('add', { user: req.user });
      }
      else{
         res.redirect('/users/index');
      }
    });
      console.log(req.body);
  });

  // Delete The Student(Final_Ok)
  router.delete("/index/:id", function(req,res){
    Student.findByIdAndRemove(req.params.id, function(err){
        if(err){
          console.log("Error in Deleting The selected Student");
          res.redirect('/users/index');
          }
          else{
            res.redirect('/users/index');
          }
    });
    
});

//Search Option in NavBar(Final_Ok)
router.post('/student', (req, res)=> {
Student.find({rgno: req.body.rgno}, function(err, students){
  if (err){
  console.log("Error!")
  }
  else {
  res.render('index',{students : students,  user: req.user });
  }
  });
});


// router.get("/addMarks/:id", function(req,res){
//   Student.find({ _id: req.params.id}, 
//     function(err, student){
//      if(err){
//          res.redirect("/index");
//      }else{
//       res.render("addMarks", {student: student,  user: req.user});
//      }
//   });
// });

// router.post("/addMarks/:id", function(req, res){
//   Student.find({ _id: req.params.id},
//      function(err, student){
//       if(err){
//           console.log(err);
//           res.redirect("/index");
//       }
//       else{
//           Mark.create(req.body, function(err, mark){
//               if(err){
//                   console.log(err);
//               } else{
//                   student.save();
//                   res.redirect('/markDetail/',{ mark: mark, user: req.user});
//               }
//           }
//       )};
//   });
// });

router.get("/addMarks/:id", function(req, res){
  Student.findOne({ _id: req.params.id } ,
     function(err, student){
      if(err){
          console.log(err);
      }
      else{
          res.render('addMarks', { student: student ,user: req.user });
      }
  });
});

router.post("/addmarks/:id", function(req, res){
  Student.findOne({ _id : req.params.id }, 
    function(err, student){
      if(err){
          console.log(err);
          res.redirect("index");
      }
      else{
          Mark.create(req.body.mark, function(err, mark){
              if(err){
                  console.log(err);
              } else{
                  student.marks.push(mark);
                  student.save();
                  res.redirect('/marks/displayMarks/' + student._id);
                  
              }
          }

      )};
  });

});

// Student Update Finally_Ok
router.get('/index/:id', function(req, res){
  Student.findOne({ _id : req.params.id },
     (err, students) => {
    if (err){
      console.log("Error In Gettingb the file For Updation!");
      res.redirect('/user/index');
    } else{
      res.render( 'change', { student: students, user: req.user  });
    }
  });
});
router.put('/index/:id', function(req, res){
  Student.findOneAndUpdate( {_id :req.params.id } ,
    { $set : {
      rollno : req.body.rollno,
      name : req.body.name,
      rgno : req.body.rgno,
      dname : req.body.dname,
      sname : req.body.sname,
      email : req.body.email
    } } ,
     (err, students) => {
    if (err){
      console.log("Error Occures in Updating the Student Details!!");
    } else{
      res.redirect('/users/index');
    }
  });
});

//student Performance Page
router.get("/students/:id", function(req, res){
  Student.findById(req.params.id).populate("marks").exec(function(err, foundStudent){
  if(err){
      res.redirect("/users/index");
      console.log(err);
  }
  else {
      console.log(foundStudent);
      res.render("marks/displayMarks", {student: foundStudent, user : req. user});
  }
  });
});

//add result page
router.get("/index/:id/marks/new", function(req, res){
  Student.findById(req.params.id, function(err, student){
      if(err){
          console.log(err);
      }
      else{
          res.render("marks/new",{student: student, user : req.user});
      }
  });
});

router.post("/index/:id/marks", function(req, res){
  Student.findById(req.params.id, function(err, student){
      if(err){
          console.log(err);
          res.redirect("/student");
      }
      else{
          Mark.create(req.body.mark, function(err, mark){
              if(err){
                  console.log(err);
              } else{
                  student.marks.push(mark);
                  student.save();
                  res.redirect('/users/students/' + student._id)
              }
          }
         
      )};
  });

});

router.get('/perform/:idS/:idM', function(req, res){
  Student.findById(req.params.idS).populate("marks").exec(function(err, foundStudent){
    if(err){
        res.redirect("/users/index");
        console.log(err);
    }
    else {
      Mark.findById(req.params.idM).exec((err, foundMark)=> {
        if(err){
          res.redirect("/users/index");
        console.log(err);
        }
        else{
          console.log(foundStudent);
          console.log(foundMark)
          res.render("marks/perform", {student: foundStudent, user : req. user , mark : foundMark});
        }
      });
    }
    });
 });

// router.get('/course/:id', (req, res) => {
//   Student.findOne({ _id : req.params.id },
//     (err, students) => {
//    if (err){
//      console.log("Error In Getting The student");
//      res.redirect('/user/index');
//    } else{
//   res.render('./courses/course', { student: students, user : req.user});
//    }
//  });;
// });

router.get('/addCourse/:id', (req, res) => {
  Student.findOne({ _id : req.params.id },
    (err, students) => {
   if (err){
     console.log("Error In Getting The student");
     res.redirect('/user/index');
   } else{
  res.render('./courses/addCourse', { student: students, user : req.user});
   }
 });
});

router.post('/addCourse/:id', (req, res)=> {
  Student.findById(req.params.id, function(err, student){
    if(err){
        console.log(err);
        res.redirect("/users/index");
    }
    else{
        Course.create({
          name : req.body.name,
          hod: req.body.hod
        }, function(err, course){
            if(err){
                console.log(err);
            } else{
                student.courses.push(course);
                student.save();
                res.redirect('/users/course/' + student._id);
            }
        });
      }
    });
  });

  router.get("/course/:id", function(req, res){
    Student.findOne({ _id : req.params.id }, (err, students)=> {
      if(err){
        res.redirect("/users/index");
        console.log(err);
    }
    else {
    Course.findOne({_id : students.courses[1]._id }).exec(function(err, foundCourse){
    if(err){
        res.redirect("/users/index");
        console.log(err);
    }
    else {
        console.log(foundCourse);
        res.redirect('/courses/course/'+ foundCourse._id, 200);
    }
    });
  }
  });
});
//show route
router.get('/addMarks', function(req, res){
  console.log(req.query);
res.render('addMarks',{ qs: req.query , user: req.user });
});
router.post('/addMarks', function(req, res){
console.log(req.body);
res.render('markDetail',{ data:req.body , user: req.user});
});

router.get('/addMarks-success', function(req, res){
console.log(req.query);
res.render('addMarks-success',{qs: req.query , user: req.user});
});
router.post('/addMarks-success', function(req, res){
console.log(req.body);
res.render('perform',{ data:req.body , user: req.user });
});

router.get('/about', function(req, res){
res.render('about');
});


module.exports = router;
