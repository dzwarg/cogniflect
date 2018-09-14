import React from 'react';
import StartOver from './StartOver';
import {Checkbox, Col, Form, Grid, Jumbotron, ProgressBar, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../actions';
import {withRouter} from "react-router-dom";

const Question = withRouter(({appState, changeHandler, history, match}) => {
  const questionId = parseInt(match.params.questionId, 10) - 1;
  const questionData = appState.get('questions').get(questionId).toJS();
  
  const cursor = 100 * (questionId / appState.get('questions').size);
  
  return (
    <Grid>
      <Row>
        <Col>
          <Jumbotron>
            <h1>Individual Assessment</h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Question #{match.params.questionId}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <p>
              {questionData.text}
            </p>
            <ul>
              {questionData.guesses.map((guess) => {
                const checkProps = {
                  onChange: changeHandler(questionId, guess.id, history),
                  checked: (guess.id === questionData.answer)
                }
    
                return (
                 <li key={guess.id}><Checkbox {...checkProps}>{guess.text}</Checkbox></li>
                );
              })}
            </ul>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProgressBar now={cursor} label={`${cursor}%`} srOnly active/>
        </Col>
      </Row>
      <StartOver />
    </Grid>
  );
});

const mapStateToProps = (state) => ({
  appState: state.appState
});

const mapDispatchToProps = (dispatch) => ({
  changeHandler: (questionId, guessId, history) => (evt) => {
    evt.preventDefault();
    
    dispatch(actions.set(['questions', questionId, 'answer'], guessId));
    dispatch((dispatch, getState) => {
      const {appState} = getState();
      if (questionId === appState.get('questions').size - 1) {
        history.push('/synchronize');
      } else {
        history.push(`/question/${questionId + 2}`);
      }
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);