var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
  rollno:Number,
 name:  {
  type:String,
  trim: true,
  required: true
},
 rgno: {
   type:String,
   required: true
 },
 dname: String,
 sname: String,
 email: String,
 fname: String,
 mname: String,
 dob: Date,
 gender:{
   type: String,
   enum: ['Male', 'Female']
 },
 address: String,
 marks:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Mark"
}],
 results:[{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Result"
 }]
});

module.exports = mongoose.model('Student', studentSchema);
