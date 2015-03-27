
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , signUp = require('./routes/signUp')
  , signOut = require('./routes/signOut')
  , userInfo = require('./routes/userInfo')
  , updateUser = require('./routes/updateUser')
  , educationDetails = require('./routes/educationDetails')
  , experienceDetails = require('./routes/experienceDetails')
  , skillDetails = require('./routes/skillDetails')
  , addDetail = require('./routes/addDetail')
  , searchPeople = require('./routes/searchPeople')
  , connections = require('./routes/connections')
  , MemoryStore = new express.session.MemoryStore()
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 7272);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
	  store : MemoryStore,
	  secret: 'random_string_goes_here',
	  duration: 60 * 1000
}));
app.use(routes);
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://10.0.0.152:6161');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie, cookie');
	res.header("Access-Control-Allow-Credentials", true);
	if (req.method === "OPTIONS") {
		console.log("Server options");
		res.end('');
	} else {
		next();
	}
});
app.use(app.router);

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', routes.index);
app.post('/login', login.afterLogin);
app.post('/signUp', signUp.signUpUser);
app.get('/userInfo', userInfo.userInfo);
app.get('/educationdetails', educationDetails.educationDetails);
app.get('/experienceDetails', experienceDetails.experienceDetails);
app.get('/skillDetails', skillDetails.skillDetails);
app.get('/connections', connections.connections);
app.get('/pendingConnections', connections.pendingConnections);
app.post('/userList', searchPeople.searchResult);
app.get('/signOut', signOut.signOut);
app.post('/updateUser', updateUser.update);
app.post('/addEducationDetail', addDetail.addEducation);
app.post('/addExperienceDetail', addDetail.addExperience);
app.post('/addSkillDetail', addDetail.addSkill);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
