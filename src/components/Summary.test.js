import React from 'react'
import Summary from './Summary'
import {fromJS} from 'immutable'

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
}

describe('components/Summary', () => {
  it('matches snapshot', () => {
    const component = Summary(initialState)
    expect(component).toMatchSnapshot();
  });
})

