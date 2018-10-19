import React, { Component } from 'react';
import './App.css';
import Board from './board.js';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      index: Array(100).fill(''), //hold all the boxes; will need to loop out to create 100 and then map boxes into it;
      userName: '',//hold the name of the player
      winArr: [] //hold ship coordintes to find winner
    }
  }
  render() {
    return (
      <main>
          <div className="App">
            <Board index={this.state.index} winArr={this.state.winArr} positionShips={this.positionShips} />
            {console.log(this.state.winArr)}
          </div>
      </main>
    );
  }
  positionShips = () => {
    let {winArr} = this.state
    winArr.push(this.buildAShip(5))
    // winArr.push(this.buildAShip(4))
    // winArr.push(this.buildAShip(3))
    // winArr.push(this.buildAShip(3))
    // winArr.push(this.buildAShip(2))
    console.log(this.state.winArr);
    this.setState({winArr: winArr})
  }

  buildAShip = (shipLength) => {
    //computer will pick random number
    //the number will be the first number of the array
    let handcuffs = 9 - shipLength
    let tens;
    let ones;
    //Determines veritcal or horizontal ship
    let axis = Math.floor(Math.random()*2)
    console.log("Axis: " + axis + "(0 for horizontal, 1 for vertical)");
    if(axis === 0){ //horizontal axis
      tens = (Math.floor(Math.random()*9)) * 10
      ones = Math.floor(Math.random()*handcuffs)
      return this.makeHorShip(tens+ones, shipLength)
    }else{// vertical axis
      tens = (Math.floor(Math.random()*handcuffs)) * 10
      ones = Math.floor(Math.random()*9)
      return this.makeVertShip(tens+ones, shipLength)
    }

  }

  makeHorShip = (startBoat, length) => {
    let newShipArr = [];
    for(let i=0;i<length;i++){
      newShipArr.push(startBoat+i);
    }
    return newShipArr
  }
  makeVertShip = (startBoat, length) => {
    let newShipArr = [];
    for(let i=0;i<length;i+=10){
      newShipArr.push(startBoat+i);
    }
    return newShipArr
  }
}

export default App;
