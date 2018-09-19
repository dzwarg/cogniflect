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
    return (users[user].teamCode === teamCode) &&
      users[user].collab;
  }).length;
};

var getAnswerCount = function(clientScore, teamCode) {
  var teamUsers = Object.keys(users).filter(function(user) { 
    return users[user].teamCode === teamCode;
  });
  var answerCount = teamUsers.reduce(function(acc, user){
    var incr = (users[user].score[clientScore.id].ourAnswer !== null) ? 1 : 0;
    return acc + incr;
  }, 0);
  return {
    questionId: clientScore.id,
    answerCount: answerCount
  };
};

io.on('connection', function(socket){
  users[socket.id] = {};
  
  socket.on('disconnect', function(){
    log('disconnecting client', socket.id);
    var teamCode = users[socket.id].teamCode;
    socket.leave(teamCode);
    delete users[socket.id];
    
    io.to(teamCode).emit('member_count', getTeammates(teamCode));
    io.to(teamCode).emit('members_synced', getSyncedTeammates(teamCode));
    log('client disconnected');
  });
  
  socket.on('register', function(teamCode) {
    log('registering client', socket.id, 'with team', teamCode);
    users[socket.id] = {
      score: [],
      teamCode: teamCode,
      collab: false
    };
  
    // join this client to a room
    socket.join(teamCode);
    
    // send all team members the size of the team
    io.to(teamCode).emit('member_count', getTeammates(teamCode));
    log('client registered');
  });
  
  socket.on('score', function(score) {
    log('scoring question', score.id, 'for client', socket.id);
    var teamCode = users[socket.id].teamCode;
    var userScore = {
      id: score.id,
      myAnswer: score.myAnswer,
      ourAnswer: score.ourAnswer,
      truth: score.truth
    };
    users[socket.id].score[score.id] = userScore;
    
    if (score.ourAnswer !== null) {
      io.to(teamCode).emit('answer_count', getAnswerCount(score, teamCode));
    }
    log('question scored');
  });

  socket.on('synchronize', function(sync) {
    log('synchronizing client', socket.id);
    var teamCode = users[socket.id].teamCode;
    users[socket.id].collab = true;

    io.to(teamCode).emit('members_synced', getSyncedTeammates(teamCode));
    log('client synchronized');
  });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});