const express = require('express');
const router = express.Router();

const Notification = require('../models/notification');

router.get('/addNotification', function(req, res){
    res.render('addNotification' , { user : req.user});
    });
  
  router.post('/addNotification', function(req, res){
    Notification.create({
      title: req.body.title
    },(err, notlist)=>{
      if(err){
        console.log(err);
        res.redirect("/users/index");
    }
    else{
      req.flash('success_msg',
      'New Notification has been Added!!'
      )
      res.redirect('/dashboard');
    }
    });
  });
  
  router.delete('/deleteNotification/:id', function(req, res){
    Notification.findByIdAndRemove(req.params.id,(err, notlist)=>{
      if(err){
        console.log(err);
        res.redirect("/users/index");
    }
    else{
      req.flash('success_msg',
      'Notification Deleted!!'
      )
      res.redirect('/dashboard');
    }
    });
  });
  



module.exports = router;