var http = require('http');
var util = require('util');
var fs = require('fs');
var querystring = require('querystring');

http.createServer(function (req, res) {
    console.log('request received');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('_testcb(\'"message "\')');
}).listen(8084);


var chunk = '';

function bindData(data) {
	chunk += data;
	availableForm();
};

function availableForm() {
	console.log('Outside available data: ' + util.inspect(querystring.parse(chunk)));
}

var server = http.createServer(function(req, res) {
	if (req.method == 'GET') {
		res.end(fs.readFileSync('templates/expressIcon.html'))
	} else {
		req.on('data', bindData);
		req.on('end', sendData);
		function sendData() {
			res.end(util.inspect(querystring.parse(chunk)));
		}
		;
	}
}).listen(8083);
