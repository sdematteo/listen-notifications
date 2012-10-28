var io = require('socket.io');
var express = require('express'), app = express.createServer(), io = io.listen(app);

app.configure(function () {
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
});

app.post('*', function(req, res) {
	console.log(req.body);
	io.sockets.in(req.url).emit('notifications', req.body);
	res.send(200);
});

app.get('*', function(req, res) {
	//res.send(res.sendfile(__dirname + '/index.html'));
	//console.log(req.url);
	res.send(
				' \
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" \
		"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> \
		<html xmlns="http://www.w3.org/1999/xhtml"> \
		<head> \
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script> \
		<script type="text/javascript" src="/socket.io/socket.io.js"></script> \
		<link rel="stylesheet" href="/jgrowl/jquery.jgrowl.css" type="text/css" /> \
		<script type="text/javascript" src="/jgrowl/jquery.jgrowl.js"></script> \
		<script type="text/javascript"> \
		var socket = io.connect("http://limitless-hollows-6411.herokuapp.com/"); \
		socket.on("connect", function() { \
		socket.emit("join", "'+req.url+'"); \
		}); \
		socket.on("notifications",function(data) { \
		$.jGrowl(JSON.stringify(data)); \
		}); \
		</script> \
		<style type="text/css"> \
		h1{font-family:arial;font-size:14px;letter-spacing:2px;color:#222;font-weight:100;} \
		</style> \
		</head> \
		<body> <p>Hhello World!</p>\
		</body> \
		</html> \
		');

		
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});

// Add a connect listener
io.sockets.on('connection', function(socket) {
	socket.on('join', function(channel) {
		socket.join(channel);
	});
});

