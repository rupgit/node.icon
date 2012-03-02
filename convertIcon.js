/**
 * @author rupgit
 */

/**
 * Include node.js modules
 */

var http = require("http"),
	fs = require("fs"),
	util = require("util"),
	gm = require('gm'),
    url = require("url"),
    path = require("path"),
    jsdom = require('jsdom'),
    exec = require("child_process").exec,
	child;

/**
 * Define path variables
 */

var	sourcePath = "svgIcons",
	rootPath = 	"/tmp",
	createTime = new Date(),
	outPath = rootPath + "/outIcons" + createTime.getTime(),
	setupPath = 		[
	            		 "tmpSVG",
	            		 "liferay_icons",
	            		 "uie_icons"
	            		 ],
	arrayPath = [],
	checkPath = [],
	iconStatus = "_test",
	sourceName = "All_Import_PendingError_31",

/**
* Define graphics containers and colors
*/
	
	readSVGs = "", readTMPs = "", svgIcon = "",	fillNewColor = "", lineNewColor = "", backNewColor = "";

/**
 * Color replacement vars
 */

var sourceIcon = {
	"oldLine" : "00FF00",
	"oldFill" : "FFFF00",
	"oldBack" : "FF00FF"
}

var iconStates = {
	"bindings" : [{
		"name" : "_Static",
		"line" : "524240",
		"fill" : "FFFFFF",
		"back" : "EAF4F7"
	}, {
		"name" : "_Active",
		"line" : "147DA2",
		"fill" : "FFFFFF",
		"back" : "EAF4F7"
	}, {
		"name" : "_Deactivated",
		"line" : "827775",
		"fill" : "FFFFFF",
		"back" : "EAF4F7"
	}, {
		"name" : "_Error",
		"line" : "E95A29",
		"fill" : "FFFFFF",
		"back" : "EAF4F7"
	}, {
		"name" : "_Hover",
		"line" : "382926",
		"fill" : "FFFFFF",
		"back" : "EAF4F7"
	}, {
		"name" : "_Success",
		"line" : "56871B",
		"fill" : "FFFFFF",
		"back" : "EAF4F7"
	}, {
		"name" : "_Visual",
		"line" : "5C1554",
		"fill" : "BEA1BB",
		"back" : "EAF4F7"
	}]
};

/**
 * Check for existing paths and create missing paths
 */

console.log("this is the outPath " + outPath);

function createOutputFolders() {
	console.log("function createOutputFolders() called");
	fs.mkdirSync(outPath);
	for (var e in setupPath) {
		fs.mkdirSync(outPath + "/" + setupPath[e])
		};
}

path.exists(rootPath, function (exists) {
	if (exists == true) {
			console.log("tmp ist da");
			createOutputFolders();
			svgProcessing();
			pngProcessing();
			//serveIcon();

	} else {
			fs.mkdirSync(rootPath);
			createOutputFolders();
			svgProcessing();
			pngProcessing();
			//serveIcon();
	}
});

/**
 * Fetch icons from file system, pass them to svgIcon variable, change colors
 * and write them to output path (single quotes after regex needed!)
 */

function svgProcessing() {

readSVGs = fs.readdirSync(sourcePath);
console.log("svg names fetched: " + readSVGs);

for (var i in readSVGs) {
	svgIcon = fs.readFileSync(sourcePath + "/" + readSVGs[i], encoding = 'utf8');
	for ( var e in iconStates.bindings) {
		var oldLine = new RegExp(sourceIcon.oldLine, "gi");
		var oldFill = new RegExp(sourceIcon.oldFill, "gi");
		var oldBack = new RegExp(sourceIcon.oldBack, "gi");
		var iconStateNew = svgIcon.replace(oldLine, iconStates.bindings[e].line).replace(oldFill, iconStates.bindings[e].fill).replace(oldBack, iconStates.bindings[e].back);
		var fileNameOut = outPath + "/" + setupPath[0] + "/" + readSVGs[i].replace(/.svg/gi, "") + iconStates.bindings[e].name; 
		fs.writeFileSync(fileNameOut + ".svg", iconStateNew, encoding = "utf8", function(err) {
					if (err)
						throw err;
				});
		console.log("SVG written:" + fileNameOut);
	};
};
}
/**
 * Triggers graphicsmagick process to convert svg
 */

function pngProcessing() {

child = exec("gm mogrify -transparent #" + iconStates.bindings[0].back + " -format png -resize 10% " + outPath + "/" + setupPath[0] + "/*.svg", function (error, stdout, stderr) {
	console.log('stdout: ' + stdout + "pngs written");
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
	readPNGs = fs.readdirSync(outPath + "/" + setupPath[0]);
	console.log(readPNGs);
	for (var i in readPNGs) {
		if (readPNGs[i].indexOf(".png") !== -1) {
	var pngBuffer = fs.readFileSync(outPath + "/" + setupPath[0] + "/" + readPNGs[i]);
	fs.writeFileSync(outPath + "/" + setupPath[2] + "/" + readPNGs[i], pngBuffer);
		}
	}
});
}