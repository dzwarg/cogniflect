import { connect } from 'react-redux';
import actions from '../actions';
import Synchronize from '../components/Synchronize'

const mapStateToProps = (state) => ({
  proceed: state.appState.get('assessmentType') === 'individual' &&
    state.appState.getIn(['team', 'members']) > 0 &&
    state.appState.getIn(['team', 'members']) === state.appState.getIn(['team', 'synced'])
});

const mapDispatchToProps = (dispatch) => ({
  continueHandler: (e) => {
    dispatch(actions.set(['assessmentType'], 'team'));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Synchronize);
export {mapStateToProps, mapDispatchToProps}