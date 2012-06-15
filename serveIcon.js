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
 * Writes content of variable svgIcon as response
 * 
 */
	var iconNames = fs.readdirSync(rootPath + "/" + setupPath[2]);
	console.log(iconNames);
	console.log(typeof(iconNames));
	
	http.createServer(function (req, res) {

		  if (process.env.NODE_ENV == 'DEVELOPMENT') {
		    mu.clearCache();
		  }

		  var stream = mu.compileAndRender("index.html", {
			  "repo": [
			           { "name": "This" },
			           { "name": " is just" },
			           { "name": " a test" },
			           ]
			       }
		  );
		  util.pump(stream, res);
		  
		}).listen(8089);	
	
	
	/**	
	jsdom.env({
		/**
		 * Create template page
		 
		html: "<html><body></body></html>",
		scripts: ["http://code.jquery.com/jquery-1.5.min.js"]
		}, function (err, window) {
		  var $ = window.jQuery;
		  $('body').append("Iconliste");
		  for (e in iconNames) {
		  $('body').append("<span><img style='width:30px; height:30px' src='" + iconNames[e] + "'> " + iconNames[e] + "</span>");
	  		};		  
		  console.log($("body").html());
		  var iconNamesHTML = $("body").html();
			fs.writeFile(rootPath + "/" + setupPath[2] + "/testIcon.html", iconNamesHTML, function(err) {
			    if(err) {
			        console.log(err);
			    } else {
			        console.log("Icon list saved as HTML.");
			    }
			});
	});

/**
 * Direct output if necessary
 * 
 http.createServer( function(request, response) {
 response.writeHead(200, {"Content-Type": "text/html"});
 response.write($("body").html());
 response.end();
 console.log(http.createServer());
 }).listen(9090);
 console.log("Server running at http://localhost:9090/");
 */



			
			
			
			
			
			
			
			