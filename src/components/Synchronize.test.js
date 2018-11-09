import React from 'react';
import {SmartComponent as Synchronize, DumbComponent} from './Synchronize';
import { createStore } from 'redux';
import reducers from '../reducers';
import {fromJS} from 'immutable';
import ShallowRenderer from 'react-test-renderer/shallow';

const initialState = {
  appState: fromJS({
    assessmentType: 'individual',
    team: {
      members: 2,
      synced: 0
    }  
  })
};

const store = createStore(reducers, initialState);

describe('smart component', () => {
  var renderedComp;
  beforeEach(() => {
    const renderer = new ShallowRenderer();
    renderedComp = renderer.render(
      <Synchronize store={store}/>
    );
  });

  it('matches snapshot', () => {
    expect(renderedComp).toMatchSnapshot()
  });
  
  it('dispatches "continueHandler"', (done) => {
    store.subscribe((action) => {
      expect(store.getState().appState.get('assessmentType')).toEqual('team');
      done();
    });
    renderedComp.props.continueHandler();
  });
});

describe('dumb component', () => {
  var renderer;
  beforeEach(() => {
    renderer = new ShallowRenderer();
  });
  
  it('matches snapshot', () => {
    const renderedComp = renderer.render(
      <DumbComponent {...initialState}/>
    );
    expect(renderedComp).toMatchSnapshot();
  });
  
  it('enables "Continue"', () => {
    const enabledState = {
      appState: initialState.appState
        .setIn(['team', 'synced'], 2)
    };
    const renderedComp = renderer.render(
      <DumbComponent {...enabledState} proceed={true}/>
    );
    expect(renderedComp).toMatchSnapshot();
  });
});