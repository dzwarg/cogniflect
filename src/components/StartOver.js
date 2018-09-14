import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default () => (
  <Row>
    <Col>
        <p>
          <LinkContainer to="/">
            <Button bsStyle="warning">Start Over</Button>
          </LinkContainer>
        </p>
    </Col>
  </Row>
);