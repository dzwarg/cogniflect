import { connect } from 'react-redux'
import StartOver from '../components/StartOver'
import actions from '../actions'

const mapStateToProps = (state) => ({
  questions: state.appState.get('questions')
})

const mapDispatchToProps = (dispatch) => ({
  startOverHandler: (questions) => (e) => {
    dispatch(actions.set(['assessmentType'], 'individual'))
    dispatch(actions.set(['teamCode'], ''))
    dispatch(actions.set(['userTeamCode'], ''))
    dispatch(actions.set(['questionCursor'], 0))
    dispatch(actions.set(['questions'], questions.map((question) => {
      return question.set('myAnswer', null).set('ourAnswer', null)
    })))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StartOver)
export {mapStateToProps, mapDispatchToProps}