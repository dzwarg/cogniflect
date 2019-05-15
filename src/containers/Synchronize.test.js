import Synchronize, {mapStateToProps, mapDispatchToProps} from './Synchronize'
import {fromJS} from 'immutable'

const initialState = {
  appState: fromJS({
    assessmentType: 'individual',
    team: {
      members: 2,
      synced: 0
    }  
  })
}

describe('containers/Synchronize', () => {
  describe('mapStateToProps', () => {
    it('maps the proceed flag', () => {
      const props = mapStateToProps(initialState)
      expect(props.proceed).toBe(false)
    })
  })
  
  describe('mapDispatchToProps', () => {
    it('maps "continueHandler"', () => {
      const props = mapDispatchToProps(initialState)
      expect(typeof props.continueHandler).toBe('function')
    })    
  })
})
