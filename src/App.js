import React, { Component } from 'react';
import './App.css';
import Board from './board.js';

class App extends Component {

  render() {
    return (
      <main>
          <div className="App">
            <Board />
          </div>
      </main>
    );
  }

}

export default App;
