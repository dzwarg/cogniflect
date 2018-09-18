import React from 'react'
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import { connect } from 'react-redux'
import actions from '../actions'

const Input = ({appState, handleChange, handleClick}) => {
  const userLabel = appState.get('userLabel')
  return (
    <Form inline>
      <FormGroup>
        <ControlLabel>Type in the label:</ControlLabel>
        {' '}
        <FormControl type="text" value={userLabel} onChange={handleChange} placeholder="My Label" />
        {' '}
        <Button onClick={handleClick(userLabel)}>Save</Button>
      </FormGroup>
    </Form>
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
    handleClick: (userLabel) => (evt) => {
      evt.preventDefault();
      dispatch(actions.set(['label'], userLabel));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);