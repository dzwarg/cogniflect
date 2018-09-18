import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import actions from '../actions';

const StartOver = ({proceed, questions, clickHandler}) => (
  <Row>
    <Col>
        <p>
          <LinkContainer to="/">
            <Button onClick={clickHandler(questions)} bsStyle="warning">Start Over</Button>
          </LinkContainer>
          {proceed && <LinkContainer to="/bananas">
            <Button bsStyle="success">Continue</Button>
          </LinkContainer>}
        </p>
    </Col>
  </Row>
);

const mapStateToProps = (state) => ({
  questions: state.appState.get('questions'),
  proceed: state.appState.getIn(['team', 'members']) > 0 &&
    state.appState.getIn(['team', 'members']) === state.appState.getIn(['team', 'synced'])
});

const mapDispatchToProps = (dispatch) => ({
  clickHandler: (questions) => (e) => {
    dispatch(actions.set(['questionCursor'], 0));
    dispatch(actions.set(['questions'], questions.map((question) => {
      return question.set('answer', null);
    })));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StartOver);