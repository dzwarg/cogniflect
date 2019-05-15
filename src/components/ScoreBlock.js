import React from 'react'
import {Col} from 'react-bootstrap'

const fmt = (val) => (`${(100 * val).toFixed(2)} %`)
const ScoreBlock = ({type, correct, total}) => (
  <Col xs={12} md={6}>
    <h2>{type}</h2>
    <h3>Score: {fmt(correct/total)}</h3>
    <p>You answered {correct} out of {total} correctly.</p>
  </Col>
)

export default ScoreBlock