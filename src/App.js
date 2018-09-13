import React from 'react';
import logo from './logo.svg';
import './App.css';
import ItemList from './components/ItemList';
import Input from './components/Input';

export default (props) => {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      <div>
        <Input />
        <ItemList />
      </div>
      </div>
    );
};
