import React from 'react';
import Intro, {HalfRow} from './Intro';
import {Button, FormControl} from 'react-bootstrap';
import reducers from '../reducers';
import {Map} from 'immutable';

const initialState = {appState: Map({userTeamCode: 'foo', teamCode: 'foo'})};

describe('components/Intro', () => {
  it('matches snapshot', () => {
    const component = Intro({...initialState, handleClick:()=>{}})
    expect(component).toMatchSnapshot();
  });
});

describe('components/HalfRow', () => {
  it('matches snapshot without className', () => {
    const component = HalfRow({children:(<p>Hello, world.</p>)})
    expect(component).toMatchSnapshot();
  })

  it('matches snapshot with className', () => {
    const component = HalfRow({className:'mister-rogers', children:(<p>Hello, world.</p>)})
    expect(component).toMatchSnapshot();
  })
})