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
            <Button variant="success">Next</Button> :
            <Button variant="success" disabled>Next</Button>
          }
        </LinkContainer>) :
        null;
  const guessCheck = ({id, text}) => {
    const checkProps = {
      onChange: changeHandler(questionData, questionId, assessmentType, answerKey, id, history),
      checked: (id === questionDataJS[answerKey])
    }

    return (
      <Form.Group key={id}>
        <Form.Check type="checkbox" {...checkProps} label={text} />
      </Form.Group>
    );
  }
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
            {questionDataJS.guesses.map(guessCheck)}
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p>
            <ProgressBar now={cursor} label={`${cursor}%`} srOnly active/>
          </p>
        </Col>
      </Row>
      <StartOver>
        {startOverChildren}
      </StartOver>
    </Container>
  );
};

export default Question;