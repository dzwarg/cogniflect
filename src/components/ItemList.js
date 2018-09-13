import React from 'react'
import { connect } from 'react-redux'

const Component = ({appState}) => {
  return (
    <div>
      {appState.get('label')}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);