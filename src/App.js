import React, { Component } from 'react';
import './App.css';
import Board from './board.js';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      index: [], //hold all the boxes; will need to loop out to create 100 and then map boxes into it;
      userName: '',//hold the name of the player
      winArr: [] //hold ship coordintes to find winner
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
            <Board index={this.state.index} winArr={this.state.winArr} positionShips={this.positionShips} />
          </div>

      </main>
    );
  }
  positionShips = () => {
    let {winArr} = this.state
    winArr.push(this.buildAShip(5))
    winArr.push(this.buildAShip(4))
    winArr.push(this.buildAShip(3))
    winArr.push(this.buildAShip(3))
    winArr.push(this.buildAShip(2))
    this.setState({winArr: winArr})
  }

  buildAShip = (shipLength) => {
    //computer will pick random number
    //the number will be the first number of the array
    let handcuffs = 9 - shipLength
    //Determines veritcal or horizontal ship
    let axis = Math.floor(Math.random()*2)
    let tens = (Math.floor(Math.random()*9)) * 10
    let ones = Math.floor(Math.random())

    if(axis === 0){ //horizontal axis
      return this.fillShip((tens+(ones*handcuffs)), shipLength, 1)
    }else{// vertical axis
      return this.fillShip(((tens*handcuffs) + ones), shipLength, 10)
    }

  }

  fillShip = (startBoat, length, inc) => {
    let newShipArr = []
    for(let i=0;i<length;i+inc){
      newShipArr.push(startBoat+i)
    }
    return newShipArr
  }


}

export default App;
