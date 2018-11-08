'use strict';
module.exports = (app,apiRoutes)=> {
  var Uservice = require('../Services/UserServices');
  var My3DModelService = require('../Services/my3DmodelServices');
  var post = require('../Services/PostsServices');
  var comment = require('../Services/CommentServices');
  //default route
  app.get('/',(req,res)=>{
    res.send('server working..');
    
    });
  // todoList Routes 
  app.route('/Authenticate').post(Uservice.Authenticate);
  app.route('/register').post(Uservice.SignIn); 
  apiRoutes.route('/users').get(Uservice.GetAllUsers);
  apiRoutes.route('/updateprofile/:userid').put(Uservice.UpdateUser);
  apiRoutes.route('/user/:userid').get(Uservice.GetUserById);
  apiRoutes.route('/updateprofilepic/:userid').post(Uservice.updateProfilePic);
  apiRoutes.route('/uploadfile/:userid').post(My3DModelService.UploadSTLFile); 
  apiRoutes.route('/models/:iduser').get(My3DModelService.getMy3Dcollection);
  apiRoutes.route('/models/delete/:modelname').delete(My3DModelService.DeleteModel);
  apiRoutes.route('/post/:iduser/add').post(post.AddPost);
  apiRoutes.route('/posts').get(post.GetAllPosts);
  apiRoutes.route('/post/:idpost').get(post.GetPostById);
  apiRoutes.route('/post/:idpost/delete').delete(post.DeletePost);
  apiRoutes.route('/post/:idpost/update').put(post.UpdatePost);
  apiRoutes.route('/comment/:postid/:userid/add').post(comment.AddComment);
  apiRoutes.route('/Comments/:idpost').get(comment.GetAllComments);
  apiRoutes.route('/Comments/:idcomment/delete/:idpost').delete(comment.DeleteComment);
  apiRoutes.route('/Comments/:idcomment/update').put(comment.UpdateComment);
  apiRoutes.route('/Comments/:idcomment').get(comment.GetCommentById);
}