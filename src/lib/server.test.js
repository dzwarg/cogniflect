'use strict';

import {log} from './server';

describe('log utility', () => {
  let defaultLog;
  
  beforeEach(() => {
    defaultLog = console.log;
    
    console.log = jest.fn();
  });
  
  it('does nothing if DEBUG is not set', () => {
    log('into the void');
    
    expect(console.log.mock.calls.length).toBe(0);
  });
  
  afterEach(() => {
    console.log = defaultLog;
  });
});