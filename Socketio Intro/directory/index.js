var socket = io();
$(function () {
   var msg = $('#msg');
   var sendBtn = $('#msgBtn');
   var chat = $('#chat');

   var user = prompt("Name?:");
   
   sendBtn.click(function () {
   		socket.emit('new_msg', {
   			username : user,
   			msg : msg.val()
   		});
   });
   socket.on('msg',function(data){
   		chat.append("<li>" + data.username + " : " + data.msg + "</li>");
   });

   socket.emit('store_user', {
   		name : user
   });
});