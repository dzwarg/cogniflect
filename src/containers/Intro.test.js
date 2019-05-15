import {Map} from 'immutable';
import {mapStateToProps, mapDispatchToProps} from './Intro'

describe('components/Intro', () => {
  describe('mapStateToProps', () => {
    
  })
  
  describe('mapDispatchToProps', () => {
    it('maps "handleChange"', () => {
      const props = mapDispatchToProps(jest.fn())
      expect(typeof props.handleChange).toBe('function')
    });

    it('dispatches "handleClick"', (done) => {
      const dispatch = jest.fn().mockImplementation(() => done())
      const props = mapDispatchToProps(dispatch)
      props.handleClick('bar')();
    })
  })
})