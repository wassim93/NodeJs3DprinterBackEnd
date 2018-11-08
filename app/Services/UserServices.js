var User = require('../models/user');
var jwt    = require('jsonwebtoken');
var sha512 = require('js-sha512');
var multer = require('multer');
module.exports = {
Authenticate : async  (req, res) =>{
  console.log(req.body);

     let user = await User.findOne({  username: req.body.username});
   
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else 
        {
          if ( Encrypt(req.body.password) != user.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {

        const payload = {
          admin: user.admin 
        };
 
            var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn: "2 days"
            });
    
            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              idToken: token, 
              expiresIn: 1440,
              user:user
            });
          }   
    
        }
    
     
    },

SignIn :  async (req,res)=>{


  var item = new  User({
      username:req.body.username,
      email : req.body.email,
      password: Encrypt(req.body.password),
      admin:true,
      firstname:"",
      lastname:"",
      address:"",
      profilepicUrl:""
      

   });

   item.save(function(err) {
      if (err) throw err;
  
     
      res.json({ success: true });
    });
  
  

  },

  GetAllUsers : async (req, res) =>{
    User.find({}, function(err, users) {
      res.json(users);
    });
  },
  UpdateUser :   async (req, res) =>{

            await User.findByIdAndUpdate(req.params.userid,req.body);

            res.status(200).json({ success: true});
    
      
      },

   GetUserById : async (req,res)=>{
    
    User.find({_id:req.params.userid},(err, user)=> {
    
      res.json(user[0]);
    });
    
    } , 
    updateProfilePic : async (req,res)=>{
      
     
       upload(req,res,function(err){
     
         if(err){
              res.json({error_code:1,err_desc:err});
              return;
         }
       
         User.update({_id:req.params.userid},{profilepicUrl:req.file.filename},(err, user)=> {
          if(err) throw err ;
         });
          res.json({error_code:0,err_desc:null});
     });
     
       
       }



      }
    /* costum methods  */
   
    var Encrypt = function(string){
      var hash = sha512.create();
      hash.update(string);
      var encrypted = hash.hex();
      return encrypted;
     }
     // file uploader  module 
     var storage = multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
          cb(null, './uploads/');
      },
      filename: function (req, file, cb) {
          var datetimestamp = Date.now();
          cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
      }
    });
    
    var upload = multer({ //multer settings
                  storage: storage
              }).single('file');