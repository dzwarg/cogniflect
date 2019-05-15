import React from 'react'
import Summary from './Summary'

const initialState = {
  individualCorrect: 2,
  teamCorrect: 4,
  totalQuestions: 6
}

describe('components/Summary', () => {
  it('matches snapshot', () => {
    const component = Summary(initialState)
    expect(component).toMatchSnapshot();
  });
})

