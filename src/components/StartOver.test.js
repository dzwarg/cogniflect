import React from 'react';
import {SmartComponent as StartOver, DumbComponent} from './StartOver';
import { createStore } from 'redux';
import reducers from '../reducers';
import {fromJS} from 'immutable';
import ShallowRenderer from 'react-test-renderer/shallow';

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

const store = createStore(reducers, initialState);
  
describe('smart component', () => {
  var renderedComp;
  beforeEach(() => {
    store.dispatch = jest.fn();
    const renderer = new ShallowRenderer();
    renderedComp = renderer.render(
      <StartOver store={store}/>
    );
  });

  it('matches snapshot', () => {
    expect(renderedComp).toMatchSnapshot()
  });

  it('dispatches "startOverHandler"', () => {
    renderedComp.props.startOverHandler(initialState.appState.get('questions'))();
    expect(store.dispatch.mock.calls.length).toBe(5);
  });

  afterEach(() => {
    store.dispatch.mockRestore();
  });
});

describe('dumb component', () => {
  var renderedComp,
      startOverHandler = jest.fn(() => () => true);
  beforeEach(() => {
    const renderer = new ShallowRenderer();
    renderedComp = renderer.render(
      <DumbComponent {...initialState} startOverHandler={startOverHandler}>
        <p>Hello, World!</p>
      </DumbComponent>
    );
  });
  
  it('without crashing', () => {
    expect(renderedComp).toMatchSnapshot();
  });
});
