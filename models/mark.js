var mongoose = require('mongoose');

var markSchema = new mongoose.Schema({
        sem : {
                type: String,
            },
        sessional: {
                type: String,
            },
        sub1: {
                subName: String,
                marks: String,
                default: 0
        },
        sub2: {
                subName: String,
                marks: String,
                default: 0
        },
        sub3:{
                subName: String,
                marks: String,
                default: 0
        },
        sub4:{
                subName: String,
                marks: String,
                default: 0
        },
        sub5: {
                subName: String,
                marks: String,
                default: 0
        },
        sub6: {
                subName: String,
                marks: String,
                default: 0
        },
        mark:{
            type: Number,
            min:0,
            max:100
        },
        totalMark:{
                type: String,
                default: 100
        },
        subject:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Semester"
     }]
});


module.exports = mongoose.model('Mark', markSchema);
