/**
 * @author rupgit
 */

/**
 * Include node.js modules
 */

var http = require('http'),
	fs = require('fs'),
	util = require('util'),
	gm = require('gm'),
    url = require('url'),
    path = require('path'),
    mu = require('mu2'),
    querystring = require('querystring'),
    exec = require('child_process').exec,
	child;

	mu.root = './templates';

/**
 * Define path variables
 */

var outPath = fs.readFileSync("createTime");
console.log("createTime is: " + outPath);

var rootPath = 		outPath,
	sourcePath =		"sourceSVG"
	setupPath = 		[
	            		 "tmpSVG",
	            		 "liferay_icons",
	            		 "uie_icons"
	            		 ],
	arrayPath = [],
	checkPath = [],
	iconStatus = "_test",
	iconNames = [],
    iconNamesHTML = "";

/**
 * Generate icon list as html (try base64 encoding)
 */

var pngIcon = fs.readFileSync(rootPath + "/" + setupPath[2] + "/add_document_1a_Deactivated.png");
console.log(pngIcon);

function htmlPage() {
	var data = "das ist ein Test " +

"<div style='background-color: green;'> alles was in dem div steht </div>" +
" /><p>" +

pngIcon +

"</p>"
	return data
}




/**
 * Direct output if necessary
*/ 
 http.createServer( function(request, response) {
 response.writeHead(200, {"Content-Type": "text/html"});
 response.write(htmlPage());
 response.end();
 console.log(http.createServer());
 }).listen(8089);
 console.log("Server running at http://localhost:8089/");




			
			
			
			
			
			
			
			