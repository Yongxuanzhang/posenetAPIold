var http = require('http');

var child_process = require("child_process");
var curl = 'curl http://www.baidu.com'
var child = child_process.exec(curl, function(err, stdout, stderr) {
    console.log(stdout);
});

child.connected