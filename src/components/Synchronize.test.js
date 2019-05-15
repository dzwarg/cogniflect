import React from 'react';
import Synchronize from './Synchronize';
import { createStore } from 'redux';
import reducers from '../reducers';
import {fromJS} from 'immutable';

const initialState = {
  appState: fromJS({
    assessmentType: 'individual',
    team: {
      members: 2,
      synced: 0
    }  
  })
};

describe('components/Synchronize', () => {
  it('matches snapshot', () => {
    const component = Synchronize(initialState)
    expect(component).toMatchSnapshot();
  });
  
  it('enables "Continue"', () => {
    const enabledState = {
      appState: initialState.appState
        .setIn(['team', 'synced'], 2)
    };
    const component = Synchronize({...enabledState, proceed:true })
    expect(component).toMatchSnapshot();
  });
});