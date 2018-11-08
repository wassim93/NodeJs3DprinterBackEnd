var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('comment', new Schema({ 

     Content : String,
    postid: {
        type: Schema.Types.ObjectId,
        ref:'post'
    },
     user : {
        type: Schema.Types.ObjectId,
        ref:'User'
     }





}));
