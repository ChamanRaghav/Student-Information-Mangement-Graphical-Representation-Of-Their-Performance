var mongoose = require('mongoose');
var resultSchema = new mongoose.Schema({

       course : {
           type: String,
       },
       sem : {
           type: String,
       },
       sessional: {
           type: String,
       },
       student : {
           type: String
       },
       subjects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject"
      }],
       marks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Mark"
      }]
});

module.exports = mongoose.model('Result',resultSchema);