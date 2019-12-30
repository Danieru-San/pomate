import React, { Component } from 'react';
import './App.css';
import Header from './components/layout/Header'
import Timer from './components/Timer'
import Clock from './components/Clock'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header/>
          {/* <Clock/> */}
          {/* <Timer/> */}
        </div>
      </div>
    );
  }
}

export default App;
