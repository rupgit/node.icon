/**
 * @author rupgit

 */

/**
 * Include node.js modules
 */

var sys = require("sys"), http = require("http"), fs = require("fs"), util = require("util"), $ = require("jquery"), jqtpl = require("jqtpl"), jsdom = require("jsdom"), htmlparser = require("htmlparser"), exec = require("child_process").exec, child;

/**
 * Define variables
 */

var	rootPath = "./images",
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
 * SVG load and change
 */

svgIcon = fs.readFileSync(rootPath + "/All_Import_FinishedProblem_31.svg", encoding='utf8');

var xml = svgIcon,
xmlDoc = $.parseXML( xml ),
$xml = $( xmlDoc ),
$path = $xml.find( "path" );

console.log($path);


/**
 * HTML Template
 */

var tpl = "<span>Test</span>" +
		"<div>${a}</div>"

jqtpl.tmpl(tpl, {
	a : 123
});

http.createServer(function(request, response) {
	response.writeHead(200, {
		"Content-Type" : "text/html"
	});
	response.write(jqtpl.tmpl(tpl, {
		a : 123
	}));
	response.end();
	console.log(http.createServer());
}).listen(9090);
sys.puts("Server running at http://localhost:9090/");

/**
 * Define vars
 * 
 * 
 * var rootPath = "../images", svgPath = "svgIcons", tmpPath = "tmpIcons",
 * pngPath = "pngIcons", gifPath = "gifIcons", arrayPath =
 * ["tmpIcons","pngIcons","gifIcons"], iconStatus = "_test", sourceName =
 * "All_Import_PendingError_31", fillNewColor = "", lineNewColor = "",
 * backNewColor = "", readSVGs = "", svgIcon = "";
 * 
 * /** Fetch icons from file system, pass them to svgIcon variable, change
 * colors and write them to tmpPath (single quotes after regex needed!)
 * 
 * @param {Object}
 *            err
 * @param {Object}
 *            data
 * 
 * 
 * colorSVG = function() {
 * 
 * readSVGs = fs.readdirSync(rootPath + "/" + svgPath); console.log("svg names
 * fetched: " + readSVGs);
 * 
 * for(var i in readSVGs) { svgIcon = fs.readFileSync(rootPath + "/" + svgPath +
 * "/" + readSVGs[i], encoding="utf8"); svgIconSkin =
 * svgIcon.replace(/ffff00/gi, 'ffffff').replace(/00ff00/gi, '000000');
 * 
 * fs.writeFile(rootPath + "/" + tmpPath + "/" + readSVGs[i], svgIconSkin,
 * encoding="utf8", function (err) { if (err) throw err; console.log("It\'s
 * saved!"); }); }; console.log("arrayPath filled: " + arrayPath) }
 * 
 * exports = colorSVG;
 */
