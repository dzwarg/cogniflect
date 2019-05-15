import Index from './index'

describe('containers/index', () => {
  it('imports all containers', () => {
    expect(Index).toBeDefined()
  })
  
  it('imports Intro', () => {
    expect(Index.Intro).toBeDefined()
  })
  
  it('imports Question', () => {
    expect(Index.Question).toBeDefined()
  })
  
  it('imports StartOver', () => {
    expect(Index.StartOver).toBeDefined()
  })
  
  it('imports Summary', () => {
    expect(Index.Summary).toBeDefined()
  })
  
  it('imports Synchronize', () => {
    expect(Index.Synchronize).toBeDefined()
  })
})