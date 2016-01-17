		var express,app,server,io,		//app vars
		routes,socket,								//routing for http and socket
		path,config,keys,							//configs
		mongoose,											//db related
		request,bodyParser,						//http request body handler
		session,auth,cookieParser,		//session or auth related
		lodash;												//utility functions

express      = require("express");									// Load the express module
app          = express();														// Express application now stored in 'app'
path         = require('path'); 										// path: contains the URL to your root
config       = require('./config/config');					// Path to mongoDB and other configurations
mongoose     = require('./config/mongoose');				// require mongoose module, which speaks between node and mongoDB
keys         = require('./config/keys');
request      = require('request');
cookieParser = require('cookie-parser');
session      = require('express-session');
bodyParser   = require('body-parser');							// Handle post data-require bodyparser
auth         = require('basic-auth');								// Authenticate passwords
_            = require('lodash');										// utility library

app.use(bodyParser.urlencoded({ extended : true }));	// Use Bodyparser for post data
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(session({																		// Store session data
// 	secret            : keys.session_secret,
// 	saveUninitialized : true,
// 	resave            : true
// }));

app.use(express.static(path.join(__dirname, 'public')));							// Serve js, css, and images
app.use(express.static(path.join(__dirname, 'server/controllers')));
app.set('keys', keys);
app.set('views',       path.join(__dirname, 'public/clientviews')); 	// goes to root/server/views for your views
app.set('view engine', 'ejs');																				// Use EJS viewing engine
app.set('port',        process.env.PORT || 1234);											// If port is not set, set it to 1234

server = app.listen(app.get('port'), function() {											// Listen to the port that has been set
console.log('\n*************************************************************************');
console.log('**********                                                     **********');
console.log('**********                                                     **********');
console.log('**********        Express.io server listening on port ' + app.get('port') + '     **********');
console.log('**********                                                     **********');
console.log('**********                                                     **********');
console.log('*************************************************************************\n');
});

io     = require('socket.io').listen(server),					// Have io listen on same server
routes = require('./config/routes-http')(app),				// Require routes files for ajax
socket = require('./config/routes-socket')(app, io);	// Require routes files for socket.io
