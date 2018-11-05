import React from 'react';
import {SmartComponent as Question, DumbComponent} from './Question';
import {Jumbotron} from 'react-bootstrap';
import { createStore } from 'redux';
import reducers from '../reducers';
import {fromJS} from 'immutable';
import ShallowRenderer from 'react-test-renderer/shallow';

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
const store = createStore(reducers, initialState);

describe('smart component', () => {
  var renderedComp;
  beforeEach(() => {
    const renderer = new ShallowRenderer();
    renderedComp = renderer.render(
      <Question store={store}/>
    );
  });

  it('matches snapshot', () => {
    expect(renderedComp).toMatchSnapshot()
  });
  
  it('dispatches "changeHandler" for individual', (done) => {
    const questionId = 0;
    const questionData = initialState.appState.get('questions').get(questionId);
    const assessmentType = initialState.appState.get('assessmentType');
    const answerKey = (assessmentType === 'individual') ? 'myAnswer' : 'ourAnswer';
    const mockHistory = {push:jest.fn()}
    renderedComp.props.changeHandler(questionData, questionId, assessmentType, answerKey, 0, mockHistory)({preventDefault: done});
  });

  it('dispatches "changeHandler" for team', (done) => {
    const questionId = 0;
    const questionData = initialState.appState.get('questions').get(questionId);
    const assessmentType = 'team';
    const answerKey = (assessmentType === 'individual') ? 'myAnswer' : 'ourAnswer';
    const mockHistory = {push:jest.fn()}
    renderedComp.props.changeHandler(questionData, questionId, assessmentType, answerKey, 0, mockHistory)({preventDefault: done});
  });

  it('dispatches "changeHandler" with no next', (done) => {
    const questionId = 0;
    const questionData = initialState.appState.get('questions').get(questionId).set('next', null);
    const assessmentType = initialState.appState.get('assessmentType');
    const answerKey = (assessmentType === 'individual') ? 'myAnswer' : 'ourAnswer';
    const mockHistory = {push:jest.fn()}
    renderedComp.props.changeHandler(questionData, questionId, assessmentType, answerKey, 0, mockHistory)({preventDefault: done});
  });

});

describe('dumb component', () => {
  var renderer;
  beforeEach(() => {
    renderer = new ShallowRenderer();
  });
  
  it('renders for individual', () => {
    const renderedComp = renderer.render(
      <DumbComponent {...initialState}
        changeHandler={()=>{}}
        match={{params:{questionId: 1}}}/>
    );
    expect(renderedComp).toMatchSnapshot();
  });

  it('renders for team', () => {
    const teamState = {
      appState: initialState.appState.set('assessmentType', 'team')
    };
    const renderedComp = renderer.render(
      <DumbComponent {...teamState}
        changeHandler={()=>{}}
        match={{params:{questionId: 1}}}/>
    );
    expect(renderedComp).toMatchSnapshot();
  });

  it('renders team last question', () => {
    const teamState = {
      appState: initialState.appState
        .set('assessmentType', 'team')
    };
    const renderedComp = renderer.render(
      <DumbComponent {...teamState}
        changeHandler={()=>{}}
        match={{params:{questionId: 2}}}/>
    );
    expect(renderedComp).toMatchSnapshot();
  });

  it('renders team all answered', () => {
    const teamState = {
      appState: initialState.appState
        .set('assessmentType', 'team')
        .setIn(['team', 'members'], 1)
    };
    const renderedComp = renderer.render(
      <DumbComponent {...teamState}
        changeHandler={()=>{}}
        match={{params:{questionId: 1}}}/>
    );
    expect(renderedComp).toMatchSnapshot();
  });
});