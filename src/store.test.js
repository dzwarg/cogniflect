import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import configureStore from './store';

jest.mock('redux', () => ({
  applyMiddleware: jest.fn(),
  combineReducers: jest.fn(),
  createStore: jest.fn(() => ({mockStore:true}))
}));

jest.mock('redux-saga', () =>
  // default import returns a function generator
  jest.fn(() => ({
    run: jest.fn()
  }))
);

jest.mock('redux-logger', () => ({
  createLogger: jest.fn(config => config)
}));

describe('configureStore function', () => {
  beforeEach(() => {
    applyMiddleware.mockClear();
    createSagaMiddleware.mockClear();
    createStore.mockClear();
  });
  
  it('creates Saga middleware', () => {
    const store = configureStore();
    expect(createSagaMiddleware.mock.calls.length).toBe(1);
  });
  
  it('creates a store', () => {
    const store = configureStore();
    expect(createStore.mock.calls.length).toBe(1);
  });
  
  it('applies middleware', () => {
    const store = configureStore();
    expect(applyMiddleware.mock.calls.length).toBe(1);
  });
  
  // notice how this isn't `mockClear`'d before each.
  // this method is invoked during module import, not
  // on each method invocation.
  it('configures the logger', () => {
    const store = configureStore();
    expect(createLogger.mock.calls.length).toBe(1);
  });
});

describe('redux-logger:stateTransformer', () => {
  it('transforms a state object into a log message', () => {
    // the create logger mock was invoked during import
    const {stateTransformer} = createLogger.mock.calls[0][0];
    const stateObj = {
      appState: {
        toJS: jest.fn()
      }
    };
    stateTransformer(stateObj);
    expect(stateObj.appState.toJS.mock.calls.length).toBe(1);
  });
});