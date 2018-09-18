import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import saga from './sagas';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  stateTransformer: (stateObj) => ({
    appState: stateObj.appState.toJS()
  })
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers, applyMiddleware(
      sagaMiddleware,
      logger
    )
  );
  sagaMiddleware.run(saga);
  return store;
}