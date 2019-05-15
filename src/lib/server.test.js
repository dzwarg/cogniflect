'use strict';

import {
  getTeammates,
  log,
  users,
  wrap
} from './server';

import winston from 'winston';

jest.mock('winston', () => ({
  log: jest.fn()
}));

describe('server module', () => {
  describe('log utility', () => {
    it('logs to winston', () => {
      log('into the queue');

      expect(winston.log.mock.calls.length).toBe(1);
    })
  })
  
  describe('wrap utility', () => {
    it('invokes the wrap function w/no args', () => {
      const wrapper = jest.fn();
      const echo = wrap(wrapper);
      
      echo();
      
      expect(wrapper.mock.calls.length).toBe(1);
    })
    
    it('invokes the wrap function w/multiple args', () => {
      const wrapper = jest.fn();
      const echo = wrap(wrapper);
      
      echo('hello', 'there');
      
      expect(wrapper.mock.calls.length).toBe(1);
      expect(wrapper.mock.calls[0][0]).toBe('hello');
      expect(wrapper.mock.calls[0][1]).toBe('there');
    })
    
    it('invokes the wrap function and catches anonymous function exceptions', () => {
      const wrapper = () => {
        throw Exception('boom')
        return true
      }
      const echo = wrap(wrapper, false)
      
      winston.log.mockClear();
      
      const retVal = echo('tick tick')
      
      expect(retVal).toBe(false);
      expect(winston.log.mock.calls.length).toBe(2);
      expect(winston.log.mock.calls[0][1]).toBe('** Exception caught in wrapper:');
    })

    it('invokes the wrap function and catches named function exceptions', () => {
      const wrapper = function explodingFun() {
        throw Exception('boom')
        return 'red'
      }
      const echo = wrap(wrapper, 'blue')
      
      winston.log.mockClear()
      
      const retVal = echo('tick tick')
      
      expect(retVal).toBe('blue');
      expect(winston.log.mock.calls.length).toBe(2);
      expect(winston.log.mock.calls[0][1]).toBe('** Exception caught in explodingFun:');
    })
  })
  
  describe('getTeammates', () => {
    it('returns no teammates if "users" is empty', () => {
      const numTeammates = getTeammates('foo')
      
      expect(numTeammates).toBe(0)
    })
    
    it('returns the # of teammates if "teamCode" doesn\'t match', () => {
      const teamCodeA = 'a'
      const teamCodeB = 'b'
      const socketId = 'deadbeef'
      
      users[socketId] = {
        teamCode: teamCodeA,
      }
      
      const numTeammates = getTeammates(teamCodeB)
      
      expect(numTeammates).toBe(0);
      
      delete users[socketId]
    })
    
    it('returns the # of teammates if "teamCode" does match', () => {
      const teamCodeA = 'a'
      const socketId = 'deadbeef'
      
      users[socketId] = {
        teamCode: teamCodeA,
      }
      
      const numTeammates = getTeammates(teamCodeA)
      
      expect(numTeammates).toBe(1);
      
      delete users[socketId]
    })
  })
})