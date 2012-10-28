var io = require('socket.io');
var express = require('express'), app = express.createServer(), io = io.listen(app);

app.configure(function () {
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
});

app.post('*', function(req, res) {
	io.sockets.in(req.url).emit('notifications', req.body);
	res.send(200);
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
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

