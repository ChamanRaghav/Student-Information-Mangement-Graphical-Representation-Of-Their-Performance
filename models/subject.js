var mongoose = require('mongoose');

var subSchema = new mongoose.Schema({
name : { 
    type:String,
    unique:true,
    required: true
},
subCode :{ 
    type:String,
    unique:true,
    required: true
},
form: {
    type: String,
    enum : ['Theory','Practical'],
    default: 'Theory',
    required:true
},
teacher:{ 
    type:String
},
semesters:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Semester"
  }],
});


module.exports = mongoose.model('Subject', subSchema);
