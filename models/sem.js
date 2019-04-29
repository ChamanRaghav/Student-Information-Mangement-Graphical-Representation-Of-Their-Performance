var mongoose = require('mongoose');

var semSchema = new mongoose.Schema({
    semester:{ 
        type:Number,
        required:true
    },
    subjects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject"
      }],
    sessionals:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sessional"
      }]
    
});


module.exports = mongoose.model('Semester', semSchema);
