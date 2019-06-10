const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Notification = require('../models/notification');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard',(req, res) =>{
Notification.find({}, (err, notes)=> {
  if(err){
    console.log(err);
    res.redirect("/users/index");
}
else{
  res.render('dashboard', {
    not: notes,
    user: req.user
  })
}
}).sort({date: -1});
});


module.exports = router;
