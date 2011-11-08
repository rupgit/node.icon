/**
 * @author rupgit
 */

/**
 * Include node.js modules
 */

var sys = require("sys"),
http = require("http"),
fs = require("fs"),
util = require("util"),
exec = require("child_process").exec,
child;

/**
 * Define vars
 */

var	rootPath = "../images",
svgPath = "svgIcons",
tmpPath = "tmpIcons",
pngPath = "pngIcons",
gifPath = "gifIcons",
arrayPath = ["tmpIcons","pngIcons","gifIcons"],
iconStatus = "_test",
sourceName = "All_Import_PendingError_31",
fillNewColor = "",
lineNewColor = "",
backNewColor = "",
readSVGs = "",
readTMPs = "",
svgIcon = "";

console.log("Created Variables: " + rootPath + tmpPath + pngPath + gifPath + arrayPath + iconStatus + sourceName + svgIcon)

/**
 * Check for existing paths and create missing paths
 */

checkPath = fs.readdirSync(rootPath);

console.log("checkPath read: " + checkPath)

for (var i in checkPath) {
	if (tmpPath == checkPath[i]) {
		arrayPath[0] = "";
	}
	if (pngPath == checkPath[i]) {
		arrayPath[1] = "";
	}
	if (gifPath == checkPath[i]) {
		arrayPath[2] = "";
	}
}

console.log("arrayPath filled: " + arrayPath);

for (var i in arrayPath) {
	if (arrayPath[i] != "") {
		fs.mkdirSync(rootPath + arrayPath[i] + "/", 448);
	}
}

/**
 * Fetch icons from file system, pass them to svgIcon variable, change
 * colors and write them to tmpPath (single quotes after regex needed!)
 *
 * @param {Object} err
 * @param {Object} data
 */

/**
 * Color replacement vars
 */

var sourceIcon = {
	"oldLine":"00FF00",
	"oldFill":"FFFF00",
	"oldBack":"FF00FF"
}

var iconStates = {"bindings": [
	{   "name":"_Static",
		"line":"524240",
		"fill":"FFFFFF",
		"back":"EAF4F7"
	},
	{
		"name":"_Active",
		"line":"147DA2",
		"fill":"FFFFFF",
		"back":"EAF4F7"
	},
	{
		"name":"_Deactivated",
		"line":"827775",
		"fill":"FFFFFF",
		"back":"EAF4F7"
	},
	{
		"name":"_Error",
		"line":"E95A29",
		"fill":"FFFFFF",
		"back":"EAF4F7"
	},
	{
		"name":"_Hover",
		"line":"382926",
		"fill":"FFFFFF",
		"back":"EAF4F7"
	},
	{
		"name":"_Success",
		"line":"56871B",
		"fill":"FFFFFF",
		"back":"EAF4F7"
	},
	{
		"name":"_Visual",
		"line":"5C1554",
		"fill":"BEA1BB",
		"back":"EAF4F7"
	}
]}

readSVGs = fs.readdirSync(rootPath + "/" + svgPath);
console.log("svg names fetched: " + readSVGs);

for(var i in readSVGs) {
	svgIcon = fs.readFileSync(rootPath + "/" + svgPath + "/" + readSVGs[i], encoding='utf8');
	for(var e in iconStates.bindings){	
		var oldLine = new RegExp(sourceIcon.oldLine, "gi");
		var oldFill = new RegExp(sourceIcon.oldFill, "gi");
		var oldBack = new RegExp(sourceIcon.oldBack, "gi");
		iconStateNew = svgIcon.replace(oldLine, iconStates.bindings[e].line).replace(oldFill, iconStates.bindings[e].fill).replace(oldBack, iconStates.bindings[e].back);
		fs.writeFile(rootPath + "/" + tmpPath + "/" + readSVGs[i].replace( /.svg/gi, "") + iconStates.bindings[e].name + ".svg", iconStateNew, encoding="utf8", function (err) {
			if (err) throw err;
		});
	};
}

console.log("arrayPath filled: " + arrayPath)

/**
 * Triggers graphicsmagick process to convert svg
 *
 * @param {Object} error
 * @param {Object} stdout
 * @param {Object} stderr
 */

child = exec("mogrify -transparent '#" + iconStates.bindings[0].back + "' -format png -resize 10% " + rootPath + "/" + tmpPath + "/*.svg", function (error, stdout, stderr) {
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
});

console.log("pngIcons created.")

child = exec("mogrify -transparent '#" + iconStates.bindings[0].back + "' -format gif -resize 10% " + rootPath + "/" + tmpPath + "/*.svg", function (error, stdout, stderr) {
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
});

console.log("gifIcons created.")

child = exec("cp " + rootPath + "/" + tmpPath + "/" + "*.png " + rootPath + "/" + pngPath + "/", function (error, stdout, stderr) {
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
});

child = exec("cp " + rootPath + "/" + tmpPath + "/" + "*.gif " + rootPath + "/" + gifPath + "/", function (error, stdout, stderr) {
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
});

/**
 * Writes content of variable svgIcon as response
 *
 * @param {http.createServer} request
 * @param {http.createServer} response


http.createServer( function(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	var iconList = fs.readdirSync(rootPath + "/" + tmpPath);
	for (i in iconList)	
		var svg = fs.readFileSync(rootPath + "/" + tmpPath + "/" + iconList[i], encoding='utf8');		
		response.write(svg);
	response.end();
	console.log(http.createServer());
}).listen(9090);
sys.puts("Server running at http://localhost:9090/");

/*
 * Variablen für Farben eingeben
 * Formular anlegen
 * SVG zuschneiden Header ist zu groß!!
 */