var mongoose = require('mongoose');

var markSchema = new mongoose.Schema({
    mark:{
        type: Number,
        min:0,
        max:100,
        required:true
    },
    totalMark:{
            type: String,
            default: 100
    },
    sub1: String,
    sub2: String,
    sub3: String,
    sub4: String,
    sub5: String,
    sub6: String,
    subject:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Semester"
     }]
});


module.exports = mongoose.model('Mark', markSchema);
