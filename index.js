var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var logon=false;
var logged_user;
var defaultRoom = 'general';
var rooms = ["General", "Other", "Secret"];



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
//    res.sendFile(__dirname + '/clientOne.js');
});


io.on('connection', function(socket){
    
  socket.emit('available_rooms', rooms);
    
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
    
    socket.on('message', function(msg){
    io.emit('message', msg);
    });
    
    socket.on('session', function(msg){
    logged_user=msg;
    //io.emit('chat message', logged_user);
        
  });
    
    

    
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
