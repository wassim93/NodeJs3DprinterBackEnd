var my3Dmodel = require('../models/3Dmodel');
var ObjectId = require('mongoose').Types.ObjectId;
var User   = require('../models/user')
var multer = require('multer');
var StlThumbnailer = require('node-stl-thumbnailer');
var fs = require('fs');

module.exports =  {

UploadSTLFile :  async (req,res)=>{
    uploadSTL(req,res,async(err)=>{
        let user = await User.find({_id:req.params.userid}) ; 
     var thumbnailer =  new StlThumbnailer({
          // url: req.file,           // url OR filePath must be supplied, but not both 
           filePath: "./STLFiles/"+req.file.filename,            // load file from filesystem 
           requestThumbnails: [
               {
                   width: 500,
                   height: 500,
               }
           ]   
       }).then((thumbnails)=>{
        let name = makeid()+".png";
        thumbnails[0].toBuffer( async(err, buf)=>{      
                     fs.writeFileSync("./uploads/"+ name, buf);
         
                 await my3Dmodel.create({
                       stlfilename:req.file.filename,
                       name:name,
                       imagename:req.body.imagename,
                       category:req.body.category,
                       User:user[0]});
                   my3Dmodel.find({"User._id":new ObjectId(req.params.userid) },(err,items)=>{

                    res.status(200).json(items);
                       })


              });
        
       
         });
         

       });
       
   
   


},


getMy3Dcollection: async (req,res)=>{

    let my3dmodels = await my3Dmodel.find({"User._id":new ObjectId(req.params.iduser) })
    res.status(200).json(my3dmodels);

},

DeleteModel : async (req,res)=>{
  
    my3Dmodel.deleteOne({
      stlfilename:req.params.modelname
    }, function(err, my3dmodels) {
      if (err) throw err; 
      fs.unlinkSync('./STLFiles/'+req.params.modelname);
    
      res.json({status:true});
    });
    
}



}













      //==========uploading STLfile
var storage2 = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './STLFiles/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
  });
  
  var uploadSTL = multer({ //multer settings
                storage: storage2
            }).single('file');
  //============================
  //======end file upload config 
  //============================
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }