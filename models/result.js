var mongoose = require('mongoose');
var resultSchema = new mongoose.Schema({

       sem : {
           type: String,
       },
       sessional: {
           type: String,
       },
       sub1:[{
           name: String,
           mark: String
       }],




       subjects:[{
           type:mongoose.Schema.Types.ObjectId,
           ref:"Subject"
        }],
        marks:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Mark"
        }],
        student : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
        }
});

module.exports = mongoose.model('Result',resultSchema);