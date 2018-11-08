var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 

  
    username:String,
    email : String,
    password: String,
    admin:Boolean,
    firstname:String,
    lastname:String,
    address:String,
    profilepicUrl:String,
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'post'
    }],
    




}));