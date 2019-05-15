import React from 'react'
import StartOver from '../containers/StartOver'
import ScoreBlock from './ScoreBlock'
import {Col, Container, Jumbotron, Row} from 'react-bootstrap'

const Summary = ({individualCorrect, teamCorrect, totalQuestions}) => (
  <Container>
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
      <ScoreBlock type={'Individually'} correct={individualCorrect} total={totalQuestions} />
      <ScoreBlock type={'Collaboratively'} correct={teamCorrect} total={totalQuestions} />
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
  </Container>
)

export default Summary
