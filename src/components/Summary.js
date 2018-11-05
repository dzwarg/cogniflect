import React from 'react';
import {SmartComponent as StartOver} from './StartOver';
import {Col, Grid, Jumbotron, Row} from 'react-bootstrap';
import { connect } from 'react-redux';

const fmt = (val) => (`${(100 * val).toFixed(2)} %`);
const Summary = ({individualCorrect, teamCorrect, totalQuestions}) => (
  <Grid>
    <Row>
      <Col>
        <Jumbotron>
          <h1>Quiz Summary</h1>
          <p>
            Research has demonstrated that people perform better as teams for these types of tasks. Typical results are 15% accuracy for individuals, and 100% accuracy for groups. How did you fare?
          </p>
        </Jumbotron>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={6}>
        <h2>Individually</h2>
        <h3>Score: {fmt(individualCorrect/totalQuestions)}</h3>
        <p>You answered {individualCorrect} out of {totalQuestions} correctly.</p>
      </Col>
      <Col xs={12} md={6}>
        <h2>Collaboratively</h2>
        <h3>Score: {fmt(teamCorrect/totalQuestions)}</h3>
        <p>Your team answered {teamCorrect} out of {totalQuestions} correctly.</p>
      </Col>
    </Row>
    <StartOver />
    <Row>
      <Col xs={12}>
        <h2>References</h2>
        <ul>
          <li><a href="http://journal.sjdm.org/15/151029/jdm151029.html">Investigating an alternate form of the cognitive reflection test</a> (<a href="http://journal.sjdm.org/vol11.1.html">Judgment and Decision Making, Vol. 11, No. 1</a>)</li>
          <li><a href="https://en.wikipedia.org/wiki/Cognitive_reflection_test">Cognitive Reflection Test</a> (Wikipedia)</li>
        </ul>
      </Col>
    </Row>
  </Grid>
);

const mapStateToProps = (state) => ({
  totalQuestions: state.appState.get('questions').size,
  individualCorrect: state.appState.get('questions').filter((val) => (
    val.get('myAnswer') === val.get('truth')
  )).size,
  teamCorrect: state.appState.get('questions').filter((val) => (
    val.get('ourAnswer') === val.get('truth')
  )).size
});

export const DumbComponent = Summary;
export const SmartComponent = connect(mapStateToProps)(Summary);