import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/bootstrap.min.css';
import components from './components';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import configureStore from './store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <div>
        <Route exact path="/" component={components.Intro} />
        <Route path="/question/:questionId" component={components.Question} />
        <Route path="/synchronize" component={components.Synchronize} />
        <Route path="/summary" component={components.Summary} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
