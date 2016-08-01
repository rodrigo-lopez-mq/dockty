var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var logon=false;
var logged_user;
var defaultRoom = 'general';
var rooms = ["General", "Other", "Secret"];
var domains = ["team_maju","other_team"];




app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    
//Search for available rooms and contacts DB
    
  socket.emit('available_rooms', rooms);
    
    socket.on('message', function(msg){
        
        var msg_domain=msg.domain;
        var msg_group=msg.group;
        
//        if (domains.indexOf(msg_domain)<=0)
//            {
//                alert("Error, domain doesn't exist");
//            }
//        if (msg.receiver.length<=0)
//            {
//                alert("Error, user doesn't exist");
//            }
        
        
        io.emit(msg.receiver, msg.message.text);
        
    });
    
    socket.on('session', function(msg){
    logged_user=msg;
    //io.emit('chat message', logged_user);
        
  });
    
    

    
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
