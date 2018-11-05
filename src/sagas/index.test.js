import {connect, subscribe, read} from './index';
import io from 'socket.io-client';
import {eventChannel} from 'redux-saga';

jest.mock('socket.io-client');
jest.mock('redux-saga', () => ({
  eventChannel: (channelFn) => channelFn
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
  it('returns an empty fn', () => {
    const mockEmit = jest.fn();
    const channel = subscribe(mockSocket());
    
    expect(channel(mockEmit)()).toBe(undefined);
  });
  
  it('emits member count', () => {
    const mockEmit = jest.fn();
    const testSocket = mockSocket();
    const channel = subscribe(testSocket);
    
    channel(mockEmit);
    
    testSocket.emit('member_count', 100);
    expect(mockEmit.mock.calls.length).toBe(1);
  });

  it('emits members synced', () => {
    const mockEmit = jest.fn();
    const testSocket = mockSocket();
    const channel = subscribe(testSocket);
    
    channel(mockEmit);
    
    testSocket.emit('members_synced', 200);
    expect(mockEmit.mock.calls.length).toBe(1);
  });

  it('emits answer count', () => {
    const mockEmit = jest.fn();
    const testSocket = mockSocket();
    const channel = subscribe(testSocket);
    
    channel(mockEmit);
    
    testSocket.emit('answer_count', {questionId: 0, answerCount: 5});
    expect(mockEmit.mock.calls.length).toBe(1);
  });
});

// describe('read generator function', () => {
//   it('calls subscribe', () => {
//     read(testSocket);
//   });
// });