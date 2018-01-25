const express = require('express');
const app = express();
//http module of node.js
const http = require('http');
//getting the server of app
const server = http.Server(app);
//getting the socket.io lib
const socketio = require('socket.io');
//pass the server on which you have to create a socket
const io = socketio(server);
const path = require('path');

let users = {};

io.on('connection', function(socket){
	console.log("new");
	socket.on('new_msg',function(data){
		if(data.msg.charAt(0) === '@'){
			var sentUser = data.msg.split(' ')[0].substring(1);
			var msg1 = data.msg.substring(data.msg.indexOf(" ")+1);
			io.to(users[sentUser]).emit('msg',{
				username : data.username,
				msg : msg1
			});
		} else {
			console.log(data);
			io.emit('msg',data);
		}
	})
	socket.on('store_user',function(data){
		users[data.name] = socket.id;
	})
})

app.use('/',express.static(path.join(__dirname,'/directory')))

server.listen(8989,function () {
	console.log("Server Started");
});