import {mapStateToProps, mapDispatchToProps} from './StartOver'
import {fromJS} from 'immutable'
import actions from '../actions'

jest.mock('../actions')

const initialState = {
  appState: fromJS({
    questions: [{
      myAnswer: true,
      ourAnswer: true
    },{
      myAnswer: false,
      ourAnswer: false
    }]
  })
}

describe('containers/StartOver', () => {
  describe('mapStateToProps', () => {
    it('maps "questions"', () => {
      const props = mapStateToProps(initialState)
      expect(props.questions.size).toBe(2)
    })
  })
  
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      actions.set.mockClear()
    })
    
    it('maps "startOverHandler"', () => {
      const props = mapDispatchToProps(jest.fn())
      expect(typeof props.startOverHandler).toBe('function')
    })
    
    it('returns a function from "startOverHandler"', () => {
      const props = mapDispatchToProps(jest.fn())
      const handler = props.startOverHandler('questions')
      expect(typeof handler).toBe('function')
    })
    
    it('dispatches 5 state changes in "startOverHandler"', () => {
      const dispatch = jest.fn()
      const props = mapDispatchToProps(dispatch)
      const handler = props.startOverHandler([])
      handler()
      
      expect(dispatch.mock.calls).toHaveLength(5)
    })

    it('resets all answers in "startOverHandler"', () => {
      const dispatch = jest.fn()
      const props = mapDispatchToProps(dispatch)
      const questions = initialState.appState.get('questions')
      const handler = props.startOverHandler(questions)
      handler()

      expect(actions.set.mock.calls).toHaveLength(5)
      
      const resetState = actions.set.mock.calls[4][1]
      const numNulled = resetState.filter((item) => (
        item.get('myAnswer') === null &&
          item.get('ourAnswer') === null
      ))
      
      expect(numNulled.size).toBe(questions.size)
    })
  })
})