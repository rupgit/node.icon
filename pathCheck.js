/**
 * @author rupgit
 */

var jsdom = require('jsdom');
var contextify = require('contextify');

var sandbox = Contextify(); // returns an empty contextified object.
sandbox.run('var x = 3;');
console.log(sandbox.x); // prints 3
sandbox.dispose();