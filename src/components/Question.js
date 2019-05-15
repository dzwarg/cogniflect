import React from 'react';
import StartOver from '../containers/StartOver';
import {Button, Col, Container, Form, Jumbotron, ProgressBar, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Question = ({appState, changeHandler, history, match}) => {
  const questionId = parseInt(match.params.questionId, 10) - 1;
  const questionData = appState.get('questions').get(questionId);
  const questionDataJS = questionData.toJS();
  const questionSize = appState.get('questions').size;
  const cursor = 100 * (questionId / questionSize);
  const memberAnswers = appState.getIn(['questions', questionId, 'teamAnswerCount']);
  const totalMembers = appState.getIn(['team', 'members']);
  const assessmentType = appState.get('assessmentType');
  const answerKey = (assessmentType === 'individual') ? 'myAnswer' : 'ourAnswer';
  
  const collabText = (assessmentType === 'team') ?
    (<p>{memberAnswers} of {totalMembers} team members have answered this question.</p>) :
    null
  const nextLocation = (questionId + 1) === questionSize ? '/summary' : `/question/${questionDataJS.next + 1}`;
  const startOverChildren = (assessmentType === 'team') ? 
        (<LinkContainer to={nextLocation}>
          {
            memberAnswers === totalMembers ?
            <Button bsStyle="success">Next</Button> :
            <Button bsStyle="success" disabled>Next</Button>
          }
        </LinkContainer>) :
        null;
  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            <h1 className="capitalized">{assessmentType} assessment</h1>
            {collabText}
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Question #{match.params.questionId}</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
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
                 <li key={guess.id}><Form.Check type="checkbox" {...checkProps}>{guess.text}</Form.Check></li>
                );
              })}
            </ul>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ProgressBar now={cursor} label={`${cursor}%`} srOnly active/>
        </Col>
      </Row>
      <StartOver>
        {startOverChildren}
      </StartOver>
    </Container>
  );
};

export default Question;