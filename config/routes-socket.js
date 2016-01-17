module.exports = function Routes(app, io) {

	// when the client connects, this listens and executes
	io.sockets.on('connection', function(socket) {
		console.log('connected!');
		// when the user disconnects.. perform this
		socket.on('disconnect', function() {
		});

	});

};
