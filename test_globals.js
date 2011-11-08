/**
 * @author rupgit
 */

var sys = require("sys"),
gm = require('gm'),
im = require('imagemagick'),
http = require("http"),
fs = require("fs"),
util = require("util"),
exec = require("child_process").exec,
child;

/**
 * Include own modules
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

// child = exec("gm convert " + rootPath + "/" + tmpPath + "/" + readTMPs[i] + " -resize 10% " + rootPath + "/" + pngPath + "/" + readTMPs[i].replace( /.svg/gi, "") + ".png", function (error, stdout, stderr)

/**
gm('../images/All_Attached_ClipAttached_15_Active.svg')
  .resample(15,15)
  .write("../images/drawing.png", function(err){
    if (!err) console.log('done')
  })
*/

im.convert([rootPath + '/All_Attached_ClipAttached_15_Active.svg', '-resize', '15x15', '../images/imdrawing.png'], 
function(err, metadata){
  if (err) throw err
})


