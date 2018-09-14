import React from 'react'
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import { connect } from 'react-redux'
import actions from '../actions'

const Input = ({appState, handleChange, handleClick}) => {
  return (
    <Form inline>
      <FormGroup>
        <ControlLabel>Type in the label:</ControlLabel>
        {' '}
        <FormControl type="text" value={appState.get('userLabel')} onChange={handleChange} placeholder="My Label" />
        {' '}
        <Button onClick={handleClick}>Save</Button>
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