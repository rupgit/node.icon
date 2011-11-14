/**
 * @author rupgit
 * 
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
 * Include own modules another comment
 * This comment requires a merge later
 */

// var col = require("./colorSVG.js");

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
	"oldBackground":"FF00FF"
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

for (i in iconStates.bindings) {

console.log(iconStates.bindings[i].name);

}
