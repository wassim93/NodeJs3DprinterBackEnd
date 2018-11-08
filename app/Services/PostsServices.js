
var post = require('../models/post');
var User   = require('../models/user');
module.exports = {
AddPost : async (req,res)=>{
const Post = new post(req.body);  
const obj = await User.findById(req.params.iduser);
Post.user = obj ; 
await Post.save();
obj.posts.push(Post);
await obj.save();
let postes = await post.find({}).populate('user');

res.status(200).json(postes);

},
GetAllPosts : async(req,res)=>{
  let posts = await  post.find({}).populate("user") ; 
   res.status(200).json(posts);

  },
GetPostById: async(req,res)=>{
    let mypost = await post.find({_id:req.params.idpost}).populate("user");
  
    res.status(200).json(mypost[0]);
  
  },
  DeletePost : async (req,res)=>{
    await post.findByIdAndRemove(req.params.idpost);
    let posts = await post.find({}).populate('user');
   
    res.status(200).json(posts);
  },

  UpdatePost : async (req,res)=>{

   await post.findByIdAndUpdate(req.params.idpost, req.body);
   let  posts = await post.find({}).populate('user') ;
   return res.status(200).json(posts);
       
  } ,  
}