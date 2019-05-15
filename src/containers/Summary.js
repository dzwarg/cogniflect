import { connect } from 'react-redux'
import Summary from '../components/Summary'

const mapStateToProps = (state) => ({
  totalQuestions: state.appState.get('questions').size,
  individualCorrect: state.appState.get('questions').filter((val) => (
    val.get('myAnswer') === val.get('truth')
  )).size,
  teamCorrect: state.appState.get('questions').filter((val) => (
    val.get('ourAnswer') === val.get('truth')
  )).size
})

export default connect(mapStateToProps)(Summary)
export {mapStateToProps}