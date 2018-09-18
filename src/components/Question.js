import React from 'react';
import StartOver from './StartOver';
import {Checkbox, Col, Form, Grid, Jumbotron, ProgressBar, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../actions';
import {withRouter} from "react-router-dom";

const Question = withRouter(({appState, changeHandler, history, match}) => {
  const questionId = parseInt(match.params.questionId, 10) - 1;
  const questionData = appState.get('questions').get(questionId);
  const questionDataJS = questionData.toJS();
  const questionSize = appState.get('questions').size;
  const cursor = 100 * (questionId / questionSize);
  
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
              {questionDataJS.text}
            </p>
            <ul>
              {questionDataJS.guesses.map((guess) => {
                const checkProps = {
                  onChange: changeHandler(questionData, questionId, guess.id, history),
                  checked: (guess.id === questionDataJS.answer)
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
  changeHandler: (questionData, questionId, guessId, history) => (evt) => {
    evt.preventDefault();
    
    dispatch(actions.set(['questions', questionId], questionData.set('answer', guessId)));

    const nextQuestion = questionData.get('next');
    dispatch(actions.set(['questionCursor'], nextQuestion))
    if (nextQuestion !== null) {
      history.push(`/question/${nextQuestion + 1}`);
    } else {
      history.push('/synchronize');
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);