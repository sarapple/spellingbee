// SUMMARY: Connect to the MONGODB database (generate error if can't connect). Load all files stored in the models foder
var mongoose, env, config, fs, connect, models_path, uriUtil;

mongoose = require('mongoose');
env      = process.env.NODE_ENV || 'development';	//set env to whatever is set in NODE, if not set then use development
config   = require('./config')[env];							//whatever comes back from it, set it to env
fs       = require('fs');
uriUtil  = require('mongodb-uri');
var uristring =
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/words';
	console.log(uristring);
mongoose.connect(uristring, function (err, res) {
	if (err) {
		console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log ('Succeeded connected to: ' + uristring);
	}
});

//Bootstrap-load the models equivalent of autoload
models_path = __dirname + '/../server/models';
fs.readdirSync(models_path).forEach(function (file) {
	if (~file.indexOf('.js')) require(models_path + '/' + file)
})
