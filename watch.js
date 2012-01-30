/**
 * @author rupgit
 * 
 */

/**
 * Include node.js modules
 */

var http = require("http"),
	fs = require("fs"),
	util = require("util"),
	watch = require("watch"),
	jsdom = require('jsdom'),
	exec = require("child_process").exec,
	child;

/**
 * Define vars
 */

var rootPath = "../images",
	pngPathLiferay = "liferay_icons",
	pngPathUIE = "uie_icons",
	arrayPath = ["tmpIcons", "pngIcons", "gifIcons" ],
	iconStatus = "_test",
	sourceName = "All_Import_PendingError_31",
	fillNewColor = "", lineNewColor = "", backNewColor = "", 
	readSVGs = "", readTMPs = "", svgIcon = "";

/**
 * Test output
 */

watch.watchTree('/tmp/node.icon/images/tmpSVG', function(f, curr, prev) {
	if (typeof f == "object" && prev === null && curr === null) {
		console.log("Finished walking tree");
		// Finished walking the tree
	} else if (prev === null) {
		console.log("Found a new svg:" + f);
		fs.readFile(f, encoding = 'utf8', function(err, data) {
			if (err)
				throw err;
			var svgIcon = data;
			console.log(svgIcon);
			jsdom.env({
				html : "<html><body>" + svgIcon + "</body></html>",
				scripts : [ 'http://code.jquery.com/jquery-1.5.min.js' ],
				done : function(errors, svg) {
					var $ = svg.jQuery;
					console.log("contents of svg:", $("body").html());
					/**
					 * Direct output if necessary
					 * 
					 */
					http.createServer(function(request, response) {
						response.writeHead(200, {
							"Content-Type" : "text/html"
						});
						response.write($("body").html());
						response.end();
						console.log(http.createServer());
					}).listen(9090);
					console.log("Server running at http://localhost:9090/");
				}
			});
		});
		// f is a new file
	} else if (curr.nlink === 0) {
		console.log("File " + f + " was removed");
		// f was removed
	} else {
		console.log("File was changed");
		// f was changed
	}
})
