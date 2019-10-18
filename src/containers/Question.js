import { connect } from 'react-redux';
import actions from '../actions';
import Question from '../components/Question';
 
const mapStateToProps = (state) => ({
  appState: state.appState
});

const mapDispatchToProps = (dispatch) => ({
  changeHandler: (questionData, questionId, assessmentType, answerKey, guessId, history) => (evt) => {
    evt.preventDefault();
    
    dispatch(actions.set(['questions', questionId], questionData.set(answerKey, guessId)));

    if (assessmentType === 'individual') {
      const nextQuestion = questionData.get('next');
      dispatch(actions.set(['questionCursor'], nextQuestion))
      if (nextQuestion !== null) {
        history.push(`/question/${nextQuestion + 1}`);
      } else {
        history.push('/synchronize');
      }
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Question)
export {mapStateToProps, mapDispatchToProps}