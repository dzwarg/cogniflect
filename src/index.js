import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/bootstrap.min.css';
import components from './components';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from "react-router-dom";

const logger = createLogger({
  stateTransformer: (stateObj) => ({
    appState: stateObj.appState.toJS()
  })
});


const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={components.Intro} />
        <Route path="/question/:questionId" component={components.Question} />
        <Route path="/synchronize" component={components.Synchronize} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
