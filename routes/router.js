
var ejs = require("ejs");

function connectionSearchResult(req, res) {
	ejs.renderFile('./views/connectionSearchResult.html', function(err, result) {
		if (!err) {
			res.end(result);
		} else {
			res.end("An error occured");
			console.log(err);
		}
	}) ;
}

function connections(req, res) {
	ejs.renderFile('./views/connections.html', function(err, result) {
		if (!err) {
			res.end(result);
		} else {
			res.end("An error occured");
			console.log(err);
		}
	}) ;
}

exports.connectionSearchResult = connectionSearchResult;
exports.connections = connections;