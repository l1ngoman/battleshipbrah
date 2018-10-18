import React, { Component } from 'react';
import './App.css';
import Board from './board.js';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      index: [], //hold all the boxes; will need to loop out to create 100 and then map boxes into it;
      userName: '',//hold the name of the player
      winArr: [[5,6,7,8,9],[56,57,58,59],[23,33,43],[69,79,89,99],[12,22]] //hold ship coordintes to find winner
    }
  }
  render() {
    let {index} = this.state
    for(let i=0;i<100;i++){
      index.push('');
    }
    return (
      <main>
          <div className="App">
            <Board index={this.state.index} winArr={this.state.winArr} resetGame={this.resetGame}/>
          </div>

      </main>
    );
  }
  positionShips = () => {
    let {winArr} = this.state
    winArr.push(5)
    winArr.push(8)
    winArr.push(33)
    winArr.push(7)
    winArr.push(2)
    this.setState({winArr: winArr})
  }
}

export default App;
