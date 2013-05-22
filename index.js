
// code from http://www.nodebeginner.org/#javascript-and-nodejs tutorial

var server = require("./server");
var router = require("./router");

server.start(router.route);
