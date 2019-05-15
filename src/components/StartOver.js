import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const StartOver = ({children, questions, startOverHandler}) => (
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

export default StartOver;