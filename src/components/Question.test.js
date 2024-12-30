import React from 'react';
import Question from './Question';
import {Jumbotron} from 'react-bootstrap';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';
import {fromJS} from 'immutable';

const initialState = {
  appState: fromJS({
    questions: [{
      id: 0,
      text: "In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake?",
      truth: 1,
      myAnswer: null,
      ourAnswer: null,
      teamAnswerCount: 0,
      guesses: [
        { id: 0, text: '24' },
        { id: 1, text: '47' },
        { id: 2, text: '96' },
        { id: 3, text: '49' }
      ],
      next: 1
    },{
      id: 1,
      text: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
      truth: 0,
      myAnswer: null,
      ourAnswer: null,
      teamAnswerCount: 0,
      guesses: [
        { id: 0, text: '$0.05' },
        { id: 1, text: '$0.06' },
        { id: 2, text: '$0.10' },
        { id: 3, text: '$0.50' }
      ],
      next: null
    }],
    team: {
      members: 0,
      synced: 0
    },
    assessmentType: 'individual'
  })
};

describe('components/Question', () => {
  it('matches snapshot for individual', () => {
    const component = Question({
      ...initialState,
      changeHandler: ()=>{},
      match: {params:{questionId: 1}}
    })
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot for team', () => {
    const teamState = {
      appState: initialState.appState.set('assessmentType', 'team')
    };
    const component = Question({
      ...teamState,
      changeHandler:()=>{},
      match:{params:{questionId: 1}}
    })
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot for team last question', () => {
    const teamState = {
      appState: initialState.appState
        .set('assessmentType', 'team')
    };
    const component = Question({
      ...teamState,
      changeHandler: ()=>{},
      match: {params:{questionId: 2}}
    })
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot for team all answered', () => {
    const teamState = {
      appState: initialState.appState
        .set('assessmentType', 'team')
        .setIn(['team', 'members'], 1)
    };
    const component = Question({
      ...teamState,
      changeHandler: ()=>{},
      match: {params:{questionId: 1}}
    })
    expect(component).toMatchSnapshot();
  });
});