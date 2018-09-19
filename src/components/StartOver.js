import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import actions from '../actions';

const StartOver = ({children, continueHandler, proceed, questions, startOverHandler}) => (
  <Row>
    <Col xs={12}>
        <p>
          <LinkContainer to="/">
            <Button onClick={startOverHandler(questions)} bsStyle="warning">Start Over</Button>
          </LinkContainer>
          {children}
        </p>
    </Col>
  </Row>
);

const mapStateToProps = (state) => ({
  questions: state.appState.get('questions')
});

const mapDispatchToProps = (dispatch) => ({
  startOverHandler: (questions) => (e) => {
    dispatch(actions.set(['assessmentType'], 'individual'));
    dispatch(actions.set(['teamCode'], ''));
    dispatch(actions.set(['userTeamCode'], ''));
    dispatch(actions.set(['questionCursor'], 0));
    dispatch(actions.set(['questions'], questions.map((question) => {
      return question.set('myAnswer', null).set('ourAnswer', null);
    })));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StartOver);