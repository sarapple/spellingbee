var path, rootPath, templatePath, notifier;

path         = require('path');
rootPath     = path.normalize(__dirname + '/..');
templatePath = path.normalize(__dirname + '/../server/mailer/templates');
notifier     = {
	service: 'postmark',
	APN: false,
	email: false,
	actions: ['comment'],
	tplPath: templatePath,
	key: 'POSTMARK_KEY',
	parseAppId: 'PARSE_APP_ID',
	parseApiKey: 'PARSE_MASTER_KEY'
};
module.exports = {			//self creates db
	development: {				//set url for the db
		db: 'mongodb://admin:H1H0H1H0@ds047315.mongolab.com:47315/heroku_t1fvnfwt',
		root: rootPath,
		notifier: notifier,
		app: {
			name: 'Nodejs Express Mongoose Words'
		}
	},
	test: {
		db: 'mongodb://admin:H1H0H1H0@ds047315.mongolab.com:47315/heroku_t1fvnfwt',
		root: rootPath,
		notifier: notifier,
		app:{
			name: 'Nodejs Express Mongoose Words'
		}
	},
	production: {}
};
