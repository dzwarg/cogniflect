import React from 'react';
import StartOver from '../containers/StartOver';
import {Button, Col, Container, Jumbotron, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import actions from '../actions';

const Synchronize = ({continueHandler, proceed}) => (
  <Container>
    <Row>
      <Col>
        <Jumbotron>
          <h1>Waiting for team</h1>
          <p>
            You&apos;re quick! Let&apos;s wait for the rest of your team.
          </p>
        </Jumbotron>
      </Col>
    </Row>
    <StartOver>
      <LinkContainer to="/question/1">
        {
          proceed ?
          <Button bsStyle="success" onClick={continueHandler}>Continue</Button> :
          <Button bsStyle="success" disabled>Continue</Button>
        }
      </LinkContainer>
    </StartOver>
  </Container>
);

export default Synchronize;
