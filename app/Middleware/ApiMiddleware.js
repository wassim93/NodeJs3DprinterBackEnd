'use_strict'
var jwt    = require('jsonwebtoken');
module.exports = (apiRoutes)=>{
    apiRoutes.use((req, res, next) =>{

     
        // check header or url parameters or post parameters for token
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
      
        // decode token
        if (token) {
      
          // verifies secret and checks exp
          jwt.verify(token, app.get('superSecret'), (err, decoded) =>{      
            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;    
              next();
            }
          });
      
        } else {
      
          // if there is no token
          // return an error
          return res.status(403).send({ 
            
              success: false, 
              message: 'No token provided.' 
          });
      
        }
      });

    
}