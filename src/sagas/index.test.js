import {
  connect,
  flow,
  handleIO,
  read,
  registerPattern,
  restartPattern,
  rootSaga,
  scorePattern,
  subscribe,
  synchronizePattern,
  write
} from './index';
import io from 'socket.io-client';
import {eventChannel} from 'redux-saga';
import {Map} from 'immutable';
import {race} from 'redux-saga/effects';

jest.mock('socket.io-client');
jest.mock('redux-saga', () => ({
  eventChannel: (channelFn) => {
    return channelFn;
  }
}));
jest.mock('redux-saga/effects', () => {
  return {
    call: jest.fn((fn, ...args) => {
      return fn.apply(null, args)
    }),
    cancel: jest.fn(),
    fork: jest.fn(),
    put: jest.fn(() => {}),
    race: jest.fn(),
    take: jest.fn(() => ({
      type: 'TEST_ACTION',
      payload: {foo: 'bar', value: 'bananas'}
    }))
  };
});

const mockSocket = () => {
  const events = {};
  return {
    on: (evt, cb) => {
      events[evt] = cb;
    },
    emit: (evt, payload) => {
      events[evt](payload);
    }
  }
};

const mockEmit = jest.fn();

const mockChannel = () => ({
  close: jest.fn(),
  flush: jest.fn((cb)=>cb()),
  take: jest.fn((cb)=>cb({type:'test action', payload:{}}))
});

describe('connect function', () => {
  it('resolves promise', (done) => {
    const testSocket = mockSocket();
    
    io.mockImplementation(() => testSocket);
    
    const result = connect();
    result.then(()=>{done()});
    
    testSocket.emit('connect');
  });
});

describe('subscribe function', () => {
  beforeEach(() => {
    mockEmit.mockReset();
  });
  
  it('returns an empty fn', () => {
    const channel = subscribe(mockSocket());
    
    expect(channel(mockEmit)()).toBe(undefined);
  });
  
  it('emits member count', () => {
    const testSocket = mockSocket();
    const channel = subscribe(testSocket);
    
    channel(mockEmit);
    
    testSocket.emit('member_count', 100);
    expect(mockEmit.mock.calls.length).toBe(1);
  });

  it('emits members synced', () => {
    const testSocket = mockSocket();
    const channel = subscribe(testSocket);
    
    channel(mockEmit);
    
    testSocket.emit('members_synced', 200);
    expect(mockEmit.mock.calls.length).toBe(1);
  });

  it('emits answer count', () => {
    const testSocket = mockSocket();
    const channel = subscribe(testSocket);
    
    channel(mockEmit);
    
    testSocket.emit('answer_count', {questionId: 0, answerCount: 5});
    expect(mockEmit.mock.calls.length).toBe(1);
  });
});

describe('read generator function', () => {
  it('calls subscribe', () => {
    const testSocket = mockSocket();
    const iter = read(testSocket);
    const channel = iter.next();
    
    expect(channel.done).toBe(false);
    expect(typeof channel.value).toBe('function');
    
    const action = iter.next();
    
    expect(action.done).toBe(false);
    expect(action.value.type).toBe('TEST_ACTION');
    
    const put = iter.next();
    
    expect(put.done).toBe(false);
    expect(typeof put.value).toBe('undefined');
  });
});

describe('scorePattern matching function', () => {
  it('matches a score action', () => {
    const action = {
      payload: {
        path: ['questions', 'index'],
        value: Map({myAnswer: 'not null'})
      }
    };
    expect(scorePattern(action)).toBe(true);
  });
  
  it('does not match a score action with incorrect path', () => {
    const action = {
      payload: {
        path: ['questions' /*, 'missing!' */],
        value: Map({myAnswer: 'not null'})
      }
    };
    expect(scorePattern(action)).toBe(false);
  });

  it('does not match a score action with a null value', () => {
    const action = {
      payload: {
        path: ['questions', 'index'],
        value: Map({myAnswer: null})
      }
    };
    expect(scorePattern(action)).toBe(false);
  });
});

describe('synchronizePattern matching function', () => {
  it('matches a synchronize action', () => {
    const action = {
      payload: {
        path: ['questionCursor'],
        value: null
      }
    };
    expect(synchronizePattern(action)).toBe(true);
  });
  
  it('does not match a synchronize action with incorrect path', () => {
    const action = {
      payload: {
        path: [/*'missing!'*/],
        value: null
      }
    };
    expect(synchronizePattern(action)).toBe(false);
  });

  it('does not match a synchronize action with a non-null value', () => {
    const action = {
      payload: {
        path: ['questionCursor'],
        value: 1
      }
    };
    expect(synchronizePattern(action)).toBe(false);
  });
});

describe('write generator function', () => {
  it('races to score', (done) => {
    const testSocket = mockSocket();
    const payloadExpect = {foo:'bar'};
    testSocket.on('score', (payloadActual) => {
      expect(payloadExpect).toEqual(payloadActual);
      done();
    });
    
    const iter = write(testSocket);

    // start the race
    iter.next();
    
    expect(iter.next({score: {type: 'SCORE_ACTION', payload: {value: payloadExpect}}}).done).toBe(false);
  });

  it('races to sync', (done) => {
    const testSocket = mockSocket();
    const payloadExpect = {foo:'bar'};
    testSocket.on('synchronize', (payloadActual) => {
      expect(payloadExpect).toEqual(payloadActual);
      done();
    });
    
    const iter = write(testSocket);

    // start the race
    iter.next();
    
    expect(iter.next({sync: {type: 'SYNC_ACTION', payload: {value: payloadExpect}}}).done).toBe(false);
  });

});

describe('handleIO generator function', () => {
  it('forks to read', () => {
    const testSocket = mockSocket();
    const iter = handleIO(testSocket);
    
    // fork once
    const fork1 = iter.next();
    expect(fork1.done).toBe(false);
    
    const fork2 = iter.next();
    expect(fork2.done).toBe(false);
  });
});

describe('registerPattern matching function', () => {
  it('matches a register action', () => {
    const action = {
      payload: {
        path: ['teamCode']
      }
    };
    expect(registerPattern(action)).toBe(true);
  });
  
  it('does not match a register action with incorrect path length', () => {
    const action = {
      payload: {
        path: ['teamCode', 'extra']
      }
    };
    expect(registerPattern(action)).toBe(false);
  });

  it('does not match a register action with an incorrect path', () => {
    const action = {
      payload: {
        path: ['notTeamCode']
      }
    };
    expect(registerPattern(action)).toBe(false);
  });
});

describe('restartPattern matching function', () => {
  it('matches a restart action', () => {
    const action = {
      payload: {
        path: ['questionCursor'],
        value: 0
      }
    };
    expect(restartPattern(action)).toBe(true);
  });
  
  it('does not match a restart action with incorrect path length', () => {
    const action = {
      payload: {
        path: ['question', 'cursor'],
        value: 0
      }
    };
    expect(restartPattern(action)).toBe(false);
  });

  it('does not match a restart action with an incorrect path', () => {
    const action = {
      payload: {
        path: ['cursorDeLaQuestiones'],
        value: 0
      }
    };
    expect(restartPattern(action)).toBe(false);
  });

  it('does not match a restart action with an incorrect value', () => {
    const action = {
      payload: {
        path: ['questionCursor'],
        value: 1
      }
    };
    expect(restartPattern(action)).toBe(false);
  });
});

describe('flow generator function', () => {
  it('performs a basic flow', () => {
    const iter = flow();
    const registerAction = {
      payload: {
        path: ['teamCode']
      }
    };
    const item1 = iter.next(registerAction);
    expect(item1.value.type).toBe('TEST_ACTION');
    iter.next(registerAction);

    const socket = mockSocket();
    const registerSpy = jest.fn();
    socket.on('register', registerSpy)
    const item2 = iter.next(socket);
    expect(registerSpy.mock.calls.length).toBe(1);
    
    const item3 = iter.next();
    expect(item3.value.type).toBe('TEST_ACTION');
    
    const restartAction = {
      payload: {
        path: ['questionCursor'],
        value: 0
      }
    };
    const item4 = iter.next(restartAction);
    expect(item4.done).toBe(false);
    
    const restartSpy = jest.fn();
    socket.on('restart', restartSpy);
    const item5 = iter.next();
    expect(restartSpy.mock.calls.length).toBe(1);
  });
});

describe('rootSaga generator function', () => {
  it('yields something', () => {
    const iter = rootSaga();
    const item1 = iter.next();
    
    expect(item1.done).toBe(false);
  });
});