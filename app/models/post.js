var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('post', new Schema({ 
     content: String, 
     Date  : String,
     user: {
         type: Schema.Types.ObjectId,
         ref:'User'
     },
     comments:[{
         type:Schema.Types.ObjectId,
         ref:'comment'
     }]
    
}));