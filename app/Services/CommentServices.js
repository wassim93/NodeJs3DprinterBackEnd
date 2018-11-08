var Comment = require('../models/comment') ;
var User   = require('../models/user')
var post = require('../models/post');
var mongoose    = require('mongoose'); 
var deepPopulate = require('mongoose-deep-populate')(mongoose);
ObjectId = require('mongoose').mongo.ObjectID ,
post.schema.plugin(deepPopulate);
module.exports = {
AddComment : async (req,res)=>{

    
     const comment = new Comment(req.body);
     const Post =  await post.findById(req.params.postid);
     const usr = await User.findById(req.params.userid);
     comment.postid = Post; 
     comment.user = usr ;
     await  comment.save();
     Post.comments.push(comment);
     await Post.save();
     let Pst =   await post.findById(req.params.postid).deepPopulate('comments.user'); 

     return res.status(200).json(Pst.comments);
   
   },
  GetAllComments:   async (req,res)=>{
    let Pst =   await post.findById(req.params.idpost).deepPopulate('comments.user'); 

    return res.status(200).json(Pst.comments);
   
   },
   
  DeleteComment : async (req,res)=>{
  
  await Comment.deleteOne({_id:req.params.idcomment});
  await post.findByIdAndUpdate(ObjectId(req.params.idpost),{ $pull: { 'comments': {  '_id' :req.params.idcomment } } });
  let Pst =   await post.findById(req.params.idpost).deepPopulate('comments.user'); 

  return res.status(200).json(Pst.comments);
  },
  UpdateComment : async (req,res)=>{

  await Comment.findByIdAndUpdate(req.params.idcomment,req.body); 
  let comments = await Comment.find({}).populate('user').populate('post');
  res.status(200).json(comments);

  },
  GetCommentById : async (req,res)=>{

    console.log(req.params.idcomment);
    let myComment = await Comment.findOne({_id:req.params.idcomment}).populate("user").populate('post');
  
    res.status(200).json(myComment);


  }


  }