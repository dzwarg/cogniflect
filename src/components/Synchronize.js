import React from 'react';
import StartOver from './StartOver';
import {Col, Grid, Jumbotron, Row} from 'react-bootstrap';

export default (props) => {
  return (
    <Grid>
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
      <StartOver />
    </Grid>
  );
};
