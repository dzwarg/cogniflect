import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/bootswatch-spacelab.min.css';
import containers from './containers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import configureStore from './store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <div>
        <Route exact path="/" component={containers.Intro} />
        <Route path="/question/:questionId" component={containers.Question} />
        <Route path="/synchronize" component={containers.Synchronize} />
        <Route path="/summary" component={containers.Summary} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));
