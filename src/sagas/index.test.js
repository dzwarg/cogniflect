import {connect, subscribe, read} from './index';
import io from 'socket.io-client';
import {eventChannel} from 'redux-saga';

jest.mock('socket.io-client');
jest.mock('redux-saga', () => ({
  eventChannel: (channelFn) => {
//     console.log('mock eventChannel:', channelFn);
    return channelFn;
  }
}));
jest.mock('redux-saga/effects', () => ({
  call: jest.fn((fn, ...args) => {
    console.log(fn, args);
    return fn.apply(null, args)
  }),
  take: jest.fn(() => ({
    type: 'TEST_ACTION',
    payload: {foo: 'bar'}
  })),
  put: jest.fn()
}));

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
    result.then(done);
    
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

// describe('read generator function', () => {
//   it('calls subscribe', () => {
//     const testSocket = mockSocket();
//     const iter = read(testSocket);
//     var item = null;
//     while (item = iter.next()) {
//       console.log(item);
//       if (item.done) break;
//     }
//   });
// });