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
    exec = require("child_process").exec,
	child;

/**
 * Define path variables
 */

var rootPath = 		"/tmp/node.icon/images",
	sourcePath =		"sourceSVG"
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
	readSVGs = "", readTMPs = "", svgIcon = "",
	fillNewColor = "", lineNewColor = "", backNewColor = "";
/**
 * Check for existing paths and create missing paths
 */

checkPath = fs.readdirSync(rootPath);
console.log("checkPath read: " + checkPath);
console.log("setupPath is: " + setupPath);

function include(arr, obj) {
	for ( var i = 0; i < arr.length; i++) {
		if (arr[i] == obj)
			return true;
	}
}

for ( var e in setupPath) {
	if (include(checkPath, setupPath[e])) {
		console.log("path found: " + setupPath[e]);
	} else {
		arrayPath.push(setupPath[e]);
	}
};

console.log("paths missing: " + arrayPath);

for (var i in arrayPath) {
	fs.mkdirSync(rootPath + "/" + arrayPath[i] + "/", 448);
};

/**
 * Fetch icons from file system, pass them to svgIcon variable, change colors
 * and write them to output path (single quotes after regex needed!)
 */
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

readSVGs = fs.readdirSync(rootPath + "/" + sourcePath);
console.log("svg names fetched: " + readSVGs);

for (var i in readSVGs) {
	svgIcon = fs.readFileSync(rootPath + "/" + sourcePath + "/" + readSVGs[i], encoding = 'utf8');
	for ( var e in iconStates.bindings) {
		var oldLine = new RegExp(sourceIcon.oldLine, "gi");
		var oldFill = new RegExp(sourceIcon.oldFill, "gi");
		var oldBack = new RegExp(sourceIcon.oldBack, "gi");
		var iconStateNew = svgIcon.replace(oldLine, iconStates.bindings[e].line).replace(oldFill, iconStates.bindings[e].fill).replace(oldBack, iconStates.bindings[e].back);
		var fileNameOut = rootPath + "/" + setupPath[0] + "/" + readSVGs[i].replace(/.svg/gi, "") + iconStates.bindings[e].name; 
		fs.writeFileSync(fileNameOut + ".svg", iconStateNew, encoding = "utf8", function(err) {
					if (err)
						throw err;
				});
		console.log("SVG written:" + fileNameOut);
	};
};

readSVGs = fs.readdirSync(rootPath + "/" + setupPath[0]);
console.log("svg-exports names fetched: " + readSVGs);

for (var i in readSVGs) {
		/**
		 * Triggers graphicsmagick process to convert svg
		 */
		gm(rootPath + "/" + setupPath[0] + "/" + readSVGs[i])
		.flip()
		.rotate('green', 45)
		.blur(7, 3)
		.crop(300, 300, 150, 130)
		.edge(3)
		.write(rootPath + "/" + setupPath[2] + "/" + readSVGs[i].replace(/.svg/gi, "") + ".png", function (err) {
		  if (!err) console.log('Graphicksmagic caused an Error!');
		})
		console.log("PNG written" + rootPath + "/" + setupPath[2] + "/" + readSVGs[i].replace(/.svg/gi, "") + ".png");
};