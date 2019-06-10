var mongoose = require('mongoose');

var subSchema = new mongoose.Schema({
branch: { 
    type:String,
    required: true
},
semester: { 
    type:Number,
    required: true
},
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
teacher:{ 
    type:String
},
date: {
    type: Date,
    default: Date.now(),
},
form: {
    type: String,
    enum : ['Theory','Practical'],
    default: 'Theory',
    required:true
}
});

module.exports = mongoose.model('Subject', subSchema);
