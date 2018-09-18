var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var DEBUG = process.env.COGNIFLECT_DEBUG;

var port = 5000;

var users = {};

var log = function() {
  if (DEBUG) console.log.apply(console, arguments);
}

var getTeammates = function(teamCode) {
  return Object.keys(users).filter(function(user) {
    return users[user].teamCode === teamCode; 
  }).length;
};

var getSyncedTeammates = function(teamCode) {
  return Object.keys(users).filter(function(user) {
    return users[user].collab;
  }).length;
}

io.on('connection', function(socket){
  log('a user connected');
  
  users[socket.id] = {};
  
  log(users);
  
  socket.on('disconnect', function(){
    log('user disconnected');
    
    var teamCode = users[socket.id].teamCode;
    socket.leave(teamCode);
    delete users[socket.id];
    
    io.to(teamCode).emit('member_count', getTeammates(teamCode));
    io.to(teamCode).emit('members_synced', getSyncedTeammates(teamCode));
    
    log(users);
  });
  
  socket.on('register', function(teamCode) {
    log("register", teamCode);
    users[socket.id] = {
      score: [],
      teamCode: teamCode,
      collab: false
    };
  
    // join this client to a room
    socket.join(teamCode);
    
    // send all team members the size of the team
    io.to(teamCode).emit('member_count', getTeammates(teamCode));
    
    log(users);
  });
  
  socket.on('score', function(score) {
    log('score', score);
    users[socket.id].score.push({
      id: score.id,
      answer: score.answer,
      truth: score.truth
    });
    log(users);
  });

  socket.on('synchronize', function(sync) {
    log('synchronize', sync);
    
    var teamCode = users[socket.id].teamCode;
    users[socket.id].collab = true;

    io.to(teamCode).emit('members_synced', getSyncedTeammates(teamCode));
    log(users);
  });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});