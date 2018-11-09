import React from 'react';
import {SmartComponent as Summary, DumbComponent} from './Summary';
import { createStore } from 'redux';
import reducers from '../reducers';
import {fromJS} from 'immutable';
import ShallowRenderer from 'react-test-renderer/shallow';

const initialState = {
  appState: fromJS({
    questions: [{
      myAnswer: true,
      ourAnswer: false,
      truth: true,
    },{
      myAnswer: false,
      ourAnswer: true,
      truth: true
    }]    
  })
};

const store = createStore(reducers, initialState);
  
describe('smart component', () => {
  var renderedComp;
  beforeEach(() => {
    const renderer = new ShallowRenderer();
    renderedComp = renderer.render(
      <Summary store={store}/>
    );
  });

  it('matches snapshot', () => {
    expect(renderedComp).toMatchSnapshot()
  });
});

describe('dumb component', () => {
  var renderedComp;
  beforeEach(() => {
    const renderer = new ShallowRenderer();
    renderedComp = renderer.render(
      <DumbComponent {...initialState}/>
    );
  });
  
  it('matches snapshot', () => {
    expect(renderedComp).toMatchSnapshot();
  });
});

