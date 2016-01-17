// SUMMARY: Connect to the MONGODB database (generate error if can't connect). Load all files stored in the models foder
var mongoose, env, fs,
    uriString, models_path;

mongoose  = require('mongoose');
env       = process.env.NODE_ENV || 'development';	//set env to whatever is set in NODE, if not set then use development
fs        = require('fs');
uriString = process.env.MONGOLAB_URI || 'mongodb://localhost/words';

mongoose.connect(uriString, function (err, res) {
	if (err) return console.log('ERROR connecting to: ' + uriString + '. ' + err);

	console.log ('Successfully connected to: ' + uriString);
});

//Bootstrap-load the models equivalent of autoload
models_path = __dirname + '/../server/models';
fs.readdirSync(models_path).forEach(function (file) {
	if (~file.indexOf('.js')) require(models_path + '/' + file)
})
