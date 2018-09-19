import React from 'react';
import StartOver from './StartOver';
import {Button, Col, Grid, Jumbotron, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import actions from '../actions';

const Synchronize = ({continueHandler, proceed}) => (
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
    <StartOver>
      <LinkContainer to="/question/1">
        {
          proceed ?
          <Button bsStyle="success" onClick={continueHandler}>Continue</Button> :
          <Button bsStyle="success" disabled>Continue</Button>
        }
      </LinkContainer>
    </StartOver>
  </Grid>
);

const mapStateToProps = (state) => ({
  proceed: state.appState.get('assessmentType') === 'individual' &&
    state.appState.getIn(['team', 'members']) > 0 &&
    state.appState.getIn(['team', 'members']) === state.appState.getIn(['team', 'synced'])
});

const mapDispatchToProps = (dispatch) => ({
  continueHandler: (e) => {
    dispatch(actions.set(['assessmentType'], 'team'));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Synchronize);