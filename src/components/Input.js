import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions'

const Input = ({appState, handleChange, handleClick}) => {
  return (
    <form>
      <input type="text" value={appState.get('userLabel')} onChange={handleChange} />
      <button onClick={handleClick}>Save</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (evt) => {
      dispatch(actions.set(['userLabel'], evt.target.value));
    },
    handleClick: (evt) => {
      evt.preventDefault();
      
      dispatch((dispatch, getState) => {
        const label = getState().appState.get('userLabel');
        dispatch(actions.set(['label'], label));
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);