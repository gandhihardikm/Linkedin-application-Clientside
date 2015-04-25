
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , router = require('./routes/router')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 6161);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular_controller',  express.static(__dirname + '/angular_controller'));
app.use('/routes',  express.static(__dirname + '/routes'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(app.router);
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:7272');
	res.header('Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept');
	res.header("Access-Control-Allow-Credentials", true);
	if (req.method === "OPTIONS") {
		console.log("Client options");
		res.end('');
	} else {
		next();
	}
});

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/login', login.login);
app.get('/successLogin', login.successLogin);
app.get('/connectionSearchResult', router.connectionSearchResult);
app.get('/connections', router.connections);
app.get('/failLogin', login.failLogin);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
