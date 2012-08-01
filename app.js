var http = require('http');
var util = require('util');
var fs = require('fs');
var querystring = require('querystring');
var io = require('socket.io').listen(8085);

var chunk = '';

function bindData(data) {
	chunk += data;
	availableForm();
};

function availableForm() {
	console.log('Outside available data: '
			+ util.inspect(querystring.parse(chunk)));
}

var server = http.createServer(function(req, res) {
	if (req.method == 'GET') {
		res.end(fs.readFileSync('templates/expressIcon.html'))
	} else {
		req.on('data', bindData);
		req.on('end', sendData);
		function sendData() {
			res.end(util.inspect(querystring.parse(chunk)));
		};
	}
}).listen(8083);

http.createServer(function(req, res) {
		req.on('data', bindData);
		req.on('end', sendData);
		function sendData() {
			res.end(chunk);
		};
}).listen(8084);