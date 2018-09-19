import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { call, cancel, fork, put, race, take} from 'redux-saga/effects';
import actions from '../actions';

const connect = () => {
  const socket = io();
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const subscribe = (socket) => {
  return eventChannel(emit => {
    socket.on('member_count', (num) => {
      emit(actions.set(['team', 'members'], num));
    });
    socket.on('members_synced', (num) => {
      emit(actions.set(['team', 'synced'], num));
    });
    socket.on('answer_count', ({questionId, answerCount}) => {
      emit(actions.set(['questions', questionId, 'teamAnswerCount'], answerCount));
    });
    socket.on('disconnect', e => {
      console.log('disconnected');
    });
    return () => {};
  });
};

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

const scorePattern = (action) => {
  // what is the data in an action that indicates that a score has been made?
  return (action.payload.path.length === 2) &&
    (action.payload.path[0] === 'questions') &&
    (action.payload.value.get('myAnswer') !== null);
};

const synchronizePattern = (action) => {
  return (action.payload.path.length === 1) &&
    (action.payload.path[0] === 'questionCursor') &&
    (action.payload.value === null);
};

function* write(socket) {
  while (true) {
    const {score, sync} = yield race({
      score: take(scorePattern),
      sync: take(synchronizePattern)
    });
    
    if (score) {
      console.log('emitting "score"');
      socket.emit('score', score.payload.value);
      console.log('emitted "score"');
    } else if (sync) {
      console.log('emitting "synchronize"');
      socket.emit('synchronize', sync.payload.value);
      console.log('emitted "synchronize"');
    }
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

const registerPattern = (action) => {
  return (action.payload.path.length === 1) &&
    (action.payload.path[0] === 'teamCode');
};

const restartPattern = (action) => {
  return (action.payload.path.length === 1) &&
    (action.payload.path[0] === 'questionCursor' &&
    (action.payload.value === 0));
};

function* flow() {
  while (true) {
    const registerAction = yield take(registerPattern);
    const teamCode = registerAction.payload.value;
    console.log('[socket] connecting');
    const socket = yield call(connect);
    console.log('[socket] connected');
    socket.emit('register', teamCode);
    console.log('[socket] registered');

    const task = yield fork(handleIO, socket);
    console.log('[socket] I/O running');
    const restartAction = yield take(restartPattern);
    console.log('[socket] cancelling I/O');
    yield cancel(task);

    console.log('[socket] synchronized');
    socket.emit('restart', restartAction);
  }
}

export default function* rootSaga() {
  yield fork(flow);
}