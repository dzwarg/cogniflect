import React from 'react';
import StartOver from './StartOver';
import {Button, Checkbox, Col, Form, Grid, Jumbotron, ProgressBar, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../actions';
import {withRouter} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';

const Question = withRouter(({appState, changeHandler, history, match}) => {
  const questionId = parseInt(match.params.questionId, 10) - 1;
  const questionData = appState.get('questions').get(questionId);
  const questionDataJS = questionData.toJS();
  const questionSize = appState.get('questions').size;
  const cursor = 100 * (questionId / questionSize);
  const memberAnswers = appState.getIn(['questions', questionId, 'teamAnswerCount']);
  const totalMembers = appState.getIn(['team', 'members']);
  const assessmentType = appState.get('assessmentType');
  const answerKey = (assessmentType === 'individual') ? 'myAnswer' : 'ourAnswer';
  
  const nextLocation = (questionId + 1) === questionSize ? '/summary' : `/question/${questionDataJS.next + 1}`;
  
  return (
    <Grid>
      <Row>
        <Col>
          <Jumbotron>
            <h1 className="capitalized">{assessmentType} assessment</h1>
            {(assessmentType === 'team') &&
              <p>{memberAnswers} of {totalMembers} team members have answered this question.</p>}
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
                  onChange: changeHandler(questionData, questionId, assessmentType, answerKey, guess.id, history),
                  checked: (guess.id === questionDataJS[answerKey])
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
      <StartOver>
        {assessmentType === 'team' &&
          <LinkContainer to={nextLocation}>
            {
              memberAnswers === totalMembers ?
              <Button bsStyle="success">Next</Button> :
              <Button bsStyle="success" disabled>Next</Button>
            }
          </LinkContainer>
        }
      </StartOver>
    </Grid>
  );
});

const mapStateToProps = (state) => ({
  appState: state.appState
});

const mapDispatchToProps = (dispatch) => ({
  changeHandler: (questionData, questionId, assessmentType, answerKey, guessId, history) => (evt) => {
    evt.preventDefault();
    
    dispatch(actions.set(['questions', questionId], questionData.set(answerKey, guessId)));

    if (assessmentType === 'individual') {
      const nextQuestion = questionData.get('next');
      dispatch(actions.set(['questionCursor'], nextQuestion))
      if (nextQuestion !== null) {
        history.push(`/question/${nextQuestion + 1}`);
      } else {
        history.push('/synchronize');
      }
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);