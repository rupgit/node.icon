/**
 * @author rupgit
 * 
 * mustache test written html-object
 */

/**
 * Include node.js modules
 */

var http = require('http'), fs = require('fs'), util = require('util'), url = require('url'), path = require('path'), mu = require('mu2'), querystring = require('querystring'), exec = require('child_process').exec, child;
mu.root = './templates';

/**
 * Define path variables
 */

var outPath = fs.readFileSync("createTime");
console.log("createTime is: " + outPath);

var rootPath = outPath, 
sourcePath = "sourceSVG"
setupPath = [ "tmpSVG", "liferay_icons", "uie_icons" ], arrayPath = [],
		checkPath = [], iconStatus = "_test", iconNames = [],
		iconNamesHTML = "";

var readPNGsArray = fs.readdirSync(rootPath + "/" + setupPath[2]);
var readPNGsMustacheObject = {"repo": []};

for (var i=0;i<readPNGsArray.length;i=i+1){
	readPNGsMustacheObject.repo[i] = {"imageURL" : readPNGsArray[i]};
};

console.log(readPNGsArray);
console.log(readPNGsMustacheObject.repo[1].imageURL);

mu.root = __dirname + '/templates'
var htmlPage = mu.compileAndRender('index.html', readPNGsMustacheObject).on('data', function (data) {
  console.log(data.toString());
  return data.toString();
});

fs.writeFileSync(rootPath + "/" + 'pngOutput.html', htmlPage, 'utf8', function(err) {
	if (err)
		throw err;
	console.log('It\'s saved!');
});


/**
 * Generate icon list as html
 * 
 * for (var i=0, l=readPNGsArray.length; i<l; i++) { readPNGsArray[i] =
 * readPNGsArray["blah"][i]; }
 * 
 * for (var e in readPNGs) { readPNGs[e] mustacheData = { "imgFileName:" } }
 * console.log(mustacheData);
 * 
 * var mustacheObject = eval('(' + readPNGs + ')') console.log(mustacheObject);
 * 


var pngIcon = fs.readFileSync(rootPath + "/" + setupPath[2]
		+ "/add_document_1a_Deactivated.png");

function htmlPage() {
	var htmlDocument = "das ist ein Test "
			+

			"<div style='background-color: green;'> alles was in dem div steht </div>"
			+ "<img alt='Embedded Image' src='/uie_icons/add_document_2a.svg' />"

	return htmlDocument
}

fs.writeFileSync(rootPath + "/" + 'pngOutput.html', htmlPage(), 'utf8', function(err) {
	if (err)
		throw err;
	console.log('It\'s saved!');
});

/**
 * Direct output if necessary
 * 
 * 
 * http.createServer( function(request, response) { response.writeHead(200,
 * {"Content-Type": "text/html"}); response.write(htmlPage()); response.end();
 * console.log(http.createServer()); }).listen(8089); console.log("Server
 * running at http://localhost:8089/");
 * 
 */
