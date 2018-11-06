import React, { Component } from 'react';
import './App.css';
import Board from './board.js';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      bkgd:
      [{
        image: './images/gameboyStart.bmp'
      },
      {
        image: './images/battleship.jpg'
      }],
      index: 0
    }
  }

  render() {
    return (
      <main>
          <div className="App">
            <Board img={this.state.bkgd[this.state.index].image} handleStart={this.handleStart}/>
          </div>
      </main>
    );
  }

  handleStart = (i) => {
    this.setState({index: i})
  }

}

export default App;
