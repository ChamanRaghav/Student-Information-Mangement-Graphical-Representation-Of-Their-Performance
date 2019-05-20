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
 image: String,
 email: String,
 marks:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Mark"
}],
 results:[{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Result"
 }],
 courses:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Course"
}]
});


module.exports = mongoose.model('Student', studentSchema);
