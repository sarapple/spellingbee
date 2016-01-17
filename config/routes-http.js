// require the controller to route url requests to
var words 	= require('./../server/controllers/words.js'),
    session = require('express-session');

module.exports = function Routes(app){
	var response, stdcb;

	stdcb = function(err, data) {
			var out;

			if (err) return response.status(500).send({ error : err });

			out = { data : data };

			response.send(out);
	}

	app.get ('/', function(req,res) {
		words.index(req,res);
	});
	app.get ('/test', function(req,res) {
		words.test(req,res);
	});
	app.get ('/words/random', function(req,res) {
		response = res;
		words.random(req,res,stdcb);
	});
	app.get ('/words/create', function(req,res) {;
		words.create(req,res);
	});
	app.get ('/words/:word', function(req,res) {
		response = res;
		words.define(req,res,stdcb);
	});
};
