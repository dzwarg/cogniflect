import React from 'react';
import Intro from './Intro';
import {Button, FormControl} from 'react-bootstrap';
import reducers from '../reducers';
import {Map} from 'immutable';

const initialState = {appState: Map({userTeamCode: 'foo', teamCode: 'foo'})};

describe('dumb component', () => {
  it('without crashing', () => {
    const component = Intro({...initialState, handleClick:()=>{}})
    expect(component).toMatchSnapshot();
  });
});
