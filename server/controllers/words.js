// require mongo models and use schema created in server/models
var mongoose   = require('mongoose'),
		Word       = mongoose.model('Word'),
		request    = require('request'),
		xml2js     = require('xml2js');

//controller methods based on routes.js
module.exports = {
	// load INDEX.EJS and use MAIN PARTIAL
	index: function(req, res){
		res.send('index ok');
	},

	test: function(req,res) {
		res.send({
			json : 'ok'
		});
	},

	random: function(req,res,cb) {
		console.log('in contorller');
		console.log(Word);
		Word.count().exec(function(err, count){
			console.log('in owrd count');
			var random;

			random = Math.floor(Math.random() * count);
			console.log(random);
			Word.findOne().skip(random).exec(
				function (err, result) {
					console.log('find one');
					console.log('in err');
					if (err) return cb(err);

					return cb(null, result);
				}
			);

		});
	},

	create: function(req,res) {
		var fs,file,mongoWords,words,word;
		mongoWords = [];

		fs = require('fs');
		fs.readFile("./wordList.txt", 'utf8', function (err, data) {
			if (err) return res.send(err);
			words = data.split("\n");

			for (var i = 0; i < words.length; i++) {
				if (words[i]) mongoWords.push({word : words[i]});
			}

			Word.create(mongoWords, function(err, doc) {
				if (err) return res.send(err);
				return res.send(doc);
			});

		});
	},

	define: function(req,res,cb) {
		var options,keys;

		keys = req.app.get('keys');
		options = {
			host  : 'http://www.dictionaryapi.com',
			path  : '/api/v1/references/learners/xml/',
			word  : req.params.word || '',
			param : '?key=' + keys.dictionary
		};

		request(options.host + options.path + options.word + options.param, function (error, response, body) {
			if (error) return cb(error);
			if (response.statusCode !== 200) return cb(response);

			xml2js.parseString(body, function(err, json) {
				if (err) return cb('fail to parse xml');

				var definition;

				definition = _.get(json, ['entry_list', 'entry', '0', 'def', '0', 'dt', '0', '_']);
				if (typeof definition == 'undefined') return cb('no matching word');

				return cb(null, definition);
			});
		});
	}
};
