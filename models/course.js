var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   hod : String,
 semesters:[{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Semester"
 }],
 students:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student"
  }]
});


module.exports = mongoose.model('Course', courseSchema);
