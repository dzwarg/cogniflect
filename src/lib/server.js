import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

import winston from 'winston';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);

const port = 5000;
export const users = {};

export const log = function log(msg) {
  winston.log('debug', msg);
};

export const wrap = function wrap(fn, defaultReturn) {
  return function wrapped() {
    try {
      return fn.apply(this, arguments);
    }
    catch (ex) {
      log('** Exception caught in ' + fn.name + ':')
      log(JSON.stringify(ex));
      return defaultReturn;
    }
  };
};

export const getTeammates = wrap(function getTeammates(teamCode) {
  return Object.keys(users).filter(function(user) {
    return users[user].teamCode === teamCode; 
  }).length;
}, 0);

export const getSyncedTeammates = wrap(function getSyncedTeammates(teamCode) {
  return Object.keys(users).filter(function(user) {
    return (users[user].teamCode === teamCode) &&
      users[user].collab;
  }).length;
}, 0);

export const getAnswerCount = wrap(function getAnswerCount(clientScore, teamCode) {
  const teamUsers = Object.keys(users).filter(function(user) { 
    return users[user].teamCode === teamCode;
  });
  const answerCount = teamUsers.reduce(function(acc, user){
    const incr = (users[user].score[clientScore.id].ourAnswer !== null) ? 1 : 0;
    return acc + incr;
  }, 0);
  return {
    questionId: clientScore.id,
    answerCount: answerCount
  };
}, 0);

export const handleConnection = wrap(function handleConnection(socket) {
  users[socket.id] = {};
  
  socket.on('disconnect', wrap(function socketDisconnect(){
    log('disconnecting client', socket.id);
    const teamCode = users[socket.id].teamCode;
    socket.leave(teamCode);
    delete users[socket.id];
    
    io.to(teamCode).emit('member_count', getTeammates(teamCode));
    io.to(teamCode).emit('members_synced', getSyncedTeammates(teamCode));
    log('client disconnected');
  }));
  
  socket.on('register', wrap(function socketRegister(teamCode) {
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
  }));
  
  socket.on('score', wrap(function socketScore(score) {
    log('scoring question', score.id, 'for client', socket.id);
    const teamCode = users[socket.id].teamCode;
    const userScore = {
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
  }));

  socket.on('synchronize', wrap(function socketSynchronize(sync) {
    log('synchronizing client', socket.id);
    const teamCode = users[socket.id].teamCode;
    users[socket.id].collab = true;

    io.to(teamCode).emit('members_synced', getSyncedTeammates(teamCode));
    log('client synchronized');
  }));
}, 0);

export const start = () => {
  io.on('connection', handleConnection);

  server.listen(port, function(){
    console.log('listening on *:' + port);
  });
};