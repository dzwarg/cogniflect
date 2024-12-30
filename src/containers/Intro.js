import { connect } from 'react-redux'
import actions from '../actions'
import Intro from '../components/Intro'

const mapStateToProps = (state) => ({
  appState: state.appState
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (evt) => {
    dispatch(actions.set(['userTeamCode'], evt.target.value));
  },
  handleClick: (teamCode) => (evt) => {
    dispatch(actions.set(['teamCode'], teamCode));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Intro)
export {mapStateToProps, mapDispatchToProps}
