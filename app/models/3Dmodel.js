var mongoose = require('mongoose');
var user = require('./user');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('my3dmodel', new Schema({ 

    stlfilename : String,
     User: user.schema ,
     name:String,
     category:String,
     imagename:String




}));