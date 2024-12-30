import ScoreBlock from './ScoreBlock'

const initialState = {
  type: 'Quasimodally',
  correct: 4,
  total: 8
}

describe('components/ScoreBlock', () => {
  it('matches snapshot', () => {
    const component = ScoreBlock(initialState)
    expect(component).toMatchSnapshot()
  })
})