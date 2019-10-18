import React from 'react';
import StartOver from './StartOver';
import {fromJS} from 'immutable';

const initialState = {
  appState: fromJS({
    children: (<p>Hello, world!</p>),
    proceed: null,
    questions: [{
      myAnswer: true,
      ourAnswer: true
    },{
      myAnswer: false,
      ourAnswer: false
    }],
    
  })
};

describe('component/StartOver', () => {
  it('matches snapshot', () => {
    const component = StartOver({...initialState, startOverHandler:jest.fn()})
    expect(component).toMatchSnapshot();
  });
});
