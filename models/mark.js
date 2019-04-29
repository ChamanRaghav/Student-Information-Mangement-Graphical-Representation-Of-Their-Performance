var mongoose = require('mongoose');

var markSchema = new mongoose.Schema({
    sem: String,
    ses: String,
    fcpc:Number,
    be:Number,
    bme:Number,
    maths:Number,
    english:Number,
    physics:Number
});


module.exports = mongoose.model('Mark', markSchema);
