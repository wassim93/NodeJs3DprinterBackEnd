const express  = require('express'),
bodyParser = require('body-parser'),
morgan      = require('morgan'),
mongoose    = require('mongoose'),
config = require('./config'),
routes = require('./app/Routes/Routes'),
middleware = require('./app/Middleware/ApiMiddleware'),
cors = require('cors'),
multer = require('multer'),
ObjectId = require('mongoose').Types.ObjectId,
StlThumbnailer = require('node-stl-thumbnailer'),
fs = require('fs');

// =======================
// configuration =========
// =======================

app = express();
// create connection
mongoose.connect(config.database,(err)=>{
  if (err) throw err;
  console.log("connected to mongo");
}); // connect to database
    
// authorize access control
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

//set secret
app.set('superSecret', config.secret);

// use morgan to log requests to the console
app.use(morgan('dev'));
/*body parser */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

const apiRoutes = express.Router(); 
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/STLFiles', express.static(__dirname + '/STLFiles'));
// route middleware to verify a token
middleware(apiRoutes);
//route config 
//firewall route 
app.use('/api', apiRoutes);
//api routes 
routes(app,apiRoutes); 
 // listening to http://127.0.0.1:3000
 app.set('port', (process.env.PORT || 3000));
 app.listen(app.get('port'), ()=> {
  console.log('Node app is running on port', app.get('port'));
});