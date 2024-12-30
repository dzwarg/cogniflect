import {Map} from 'immutable';
import {mapStateToProps, mapDispatchToProps} from './Intro'

describe('components/Intro', () => {
  describe('mapStateToProps', () => {
    it('maps "appState"', () => {
      const initialState = {
        appState: {
          foo: 'bar'
        }
      }
      const props = mapStateToProps(initialState)
      expect(props.appState).toBe(initialState.appState)
    })
  })
  
  describe('mapDispatchToProps', () => {
    it('maps "handleChange"', () => {
      const props = mapDispatchToProps(jest.fn())
      expect(typeof props.handleChange).toBe('function')
    })

    it('dispatches "handleChange"', (done) => {
      const dispatch = jest.fn().mockImplementation(() => done())
      const props = mapDispatchToProps(dispatch)
      const evt = {
        target: {
          value: 'foo bar'
        }
      }
      props.handleChange(evt);
    })

    it('maps "handleClick"', () => {
      const props = mapDispatchToProps(jest.fn())
      expect(typeof props.handleClick).toBe('function')
    })

    it('dispatches "handleClick"', (done) => {
      const dispatch = jest.fn().mockImplementation(() => done())
      const props = mapDispatchToProps(dispatch)
      props.handleClick('bar')();
    })
  })
})