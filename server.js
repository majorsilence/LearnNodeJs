

function start(route) {

	var http = require("http").createServer(onRequest)
	, io = require('socket.io').listen(http)
	, fs = require('fs')

	var url = require("url");

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("request for " + pathname + " received.");
		
		if (pathname == "/index.html"){
		
			handle_index(request, response);
			return;
		}
		
		route(pathname);
		
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();
	}

	http.listen(8888);
	console.log("Server has started.");
	
	
	io.sockets.on('connection', function (socket) {
		socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
			console.log(data);
		});
	});

	
	function handle_index(request, response){
		console.log("handle_index function");
	
		fs.readFile(__dirname + "/index.html",
			function(err, data) {
				if(err) {
					response.writeHead(500);
					return response.end("Error loading index.html");
				}
				
				response.writeHead(200);
				response.end(data);
			});
	}

	
}



exports.start = start;
