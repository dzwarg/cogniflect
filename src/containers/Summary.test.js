import {mapStateToProps} from './Summary'
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

describe('containers/Summary', () => {
  describe('mapStateToProps', () => {
    it('maps "totalQuestions" into props', () => {
      const props = mapStateToProps(initialState);
      expect(props.totalQuestions).toBe(2)
    })
  });
});
