import Question, {mapDispatchToProps, mapStateToProps} from './Question'
import {fromJS} from 'immutable'

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
  describe('mapStateToProps', () => {
    it('maps appState', () => {
      const props = mapStateToProps(initialState);
      expect(props.appState).toEqual(initialState.appState)
    })
  })
  
  describe('mapDispatchToProps', () => {
    it('maps changeHandler', () => {
      const props = mapDispatchToProps(jest.fn())
      expect(typeof props.changeHandler).toBe('function')
    })
    
    it('dispatches "changeHandler" for individual', (done) => {
      const questionId = 0;
      const questionData = initialState.appState.get('questions').get(questionId);
      const assessmentType = initialState.appState.get('assessmentType');
      const answerKey = (assessmentType === 'individual') ? 'myAnswer' : 'ourAnswer';
      const mockHistory = {push:jest.fn()}

      const props = mapDispatchToProps(jest.fn())
      props.changeHandler(questionData, questionId, assessmentType, answerKey, 0, mockHistory)({preventDefault: done});
    })

    it('dispatches "changeHandler" for team', (done) => {
      const questionId = 0;
      const questionData = initialState.appState.get('questions').get(questionId);
      const assessmentType = 'team';
      const answerKey = (assessmentType === 'individual') ? 'myAnswer' : 'ourAnswer';
      const mockHistory = {push:jest.fn()}

      const props = mapDispatchToProps(jest.fn())
      props.changeHandler(questionData, questionId, assessmentType, answerKey, 0, mockHistory)({preventDefault: done});
    })
    
    it('dispatches "changeHandler" with no next', (done) => {
      const questionId = 0;
      const questionData = initialState.appState.get('questions').get(questionId).set('next', null);
      const assessmentType = initialState.appState.get('assessmentType');
      const answerKey = (assessmentType === 'individual') ? 'myAnswer' : 'ourAnswer';
      const mockHistory = {push:jest.fn()}

      const props = mapDispatchToProps(jest.fn())
      props.changeHandler(questionData, questionId, assessmentType, answerKey, 0, mockHistory)({preventDefault: done});
    })
  })
})