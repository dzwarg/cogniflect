import Synchronize, {mapStateToProps, mapDispatchToProps} from './Synchronize'
import {fromJS} from 'immutable'

const initialState = {
  appState: fromJS({
    assessmentType: 'individual',
    team: {
      members: 2,
      synced: 2
    }  
  })
}

describe('containers/Synchronize', () => {
  describe('mapStateToProps', () => {
    it('maps the proceed flag false 1', () => {
      const falseState = {
        appState: initialState.appState.set('assessmentType', 'team')
      }
      const props = mapStateToProps(falseState)
      expect(props.proceed).toBe(false)
    })
    
    it('maps the proceed flag false 2', () => {
      const falseState = {
        appState: initialState.appState.setIn(['team', 'members'], 0)
      }
      const props = mapStateToProps(falseState)
      expect(props.proceed).toBe(false)
    })
    
    it('maps the proceed flag false 3', () => {
      const falseState = {
        appState: initialState.appState.setIn(['team', 'synced'], 1)
      }
      const props = mapStateToProps(falseState)
      expect(props.proceed).toBe(false)
    })
    
    it('maps the proceed flag true', () => {
      const props = mapStateToProps(initialState)
      expect(props.proceed).toBe(true)
    })
  })
  
  describe('mapDispatchToProps', () => {
    it('maps "continueHandler"', () => {
      const props = mapDispatchToProps(initialState)
      expect(typeof props.continueHandler).toBe('function')
    })
    
    it('dispatches an action to set the assessmentType', (done) => {
      const dispatch = jest.fn().mockImplementation(() => done())
      const props = mapDispatchToProps(dispatch)
      
      props.continueHandler()
    })
  })
})
