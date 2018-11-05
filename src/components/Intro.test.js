import React from 'react';
import {SmartComponent as Intro, DumbComponent} from './Intro';
import {Button, FormControl} from 'react-bootstrap';
import { createStore } from 'redux';
import reducers from '../reducers';
import {Map} from 'immutable';
import ShallowRenderer from 'react-test-renderer/shallow';

const initialState = {appState: Map({userTeamCode: 'foo', teamCode: 'foo'})};
const store = createStore(reducers, initialState);

describe('smart component', () => {
  var renderedComp;
  beforeEach(() => {
    const renderer = new ShallowRenderer();
    renderedComp = renderer.render(
      <Intro store={store}/>
    );
  });

  it('matches snapshot', () => {
    expect(renderedComp).toMatchSnapshot()
  });

  it('dispatches "handleChange"', (done) => {
    store.subscribe((action) => {
      expect(store.getState().appState.get('userTeamCode')).toEqual('bar');
      done();
    });
    renderedComp.props.handleChange({target: {value:'bar'}});
  });

  it('dispatches "handleClick"', (done) => {
    store.subscribe((action) => {
      expect(store.getState().appState.get('teamCode')).toEqual('bar');
      done();
    });
    renderedComp.props.handleClick('bar')();
  });
});

describe('dumb component', () => {
  var renderedComp;
  beforeEach(() => {
    const renderer = new ShallowRenderer();
    renderedComp = renderer.render(
      <DumbComponent {...initialState} handleClick={()=>{}}/>
    );
  });
  
  it('without crashing', () => {
    expect(renderedComp).toMatchSnapshot();
  });
});
