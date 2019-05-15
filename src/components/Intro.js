import React from 'react';
import {Button, Col, Container, FormControl, FormGroup, InputGroup, Jumbotron, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import '../styles/Intro.css';

const Intro = ({appState, handleChange, handleClick}) => {
  const userTeamCode = appState.get('userTeamCode');
  
  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            <h1>This is the Cogniflector</h1>
            <p>
              This application will ask you a short series of questions to you and your team.
            </p>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p>
            This application will take you through the steps to evaluate your own cognitive reflection. The process is simple:
          </p>
          <ol>
            <li>Answer a series of multiple choice questions individually.</li>
            <li>Answer a series of multiple choice questions in groups of 3 or more.</li>
            <li>The scores from step <b>1</b> and <b>2</b> are compared.</li>
          </ol>
        </Col>
      </Row>
      <Row>
        <Col xs={6} xsOffset={3} md={4} mdOffset={4} lg={2} lgOffset={5}>
          <div className="centered">
            <FormGroup>
              <InputGroup>
                <InputGroup.Prepend>#</InputGroup.Prepend>
                <FormControl type="text" placeholder="team code" onChange={handleChange} value={userTeamCode} />
              </InputGroup>
            </FormGroup>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={6} xsOffset={3} md={4} mdOffset={4} lg={2} lgOffset={5}>
          <p className="centered">
            <LinkContainer to="/question/1">
              <Button onClick={handleClick(userTeamCode)} bsStyle="success">Let&apos;s get started!</Button>
            </LinkContainer>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Intro
