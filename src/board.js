import React, { Component } from 'react';
import './App.css';
import Box from './box.js'
class Board extends Component {
  constructor(props){
    super(props)

    this.state = {
      torpedoCount: 25, //parent, state variable; torpedoCount will decrement on every legal click
      clickCount: 0, //parent, state variable; will increment on every legal click; keeps track of turns
      boardState: [], //array containing all hits and misses; parent state variable
      colors: ["#30b321", "red", "blue"], //green = unclicked, red = isHit() = true, blue = isHit() = false; parent, state; variable; pass to to child

    }
  }
  render() {
    this.startGame();
    let boxes = this.props.index.map((box,i) => {
      return(
        <Box id={i} isHit={this.isHit} colors={this.state.colors} handleClickBoard={this.handleClickBoard} />
      )
    })
    return (
      <div className="App">

      </div>
    );
  }

  handleClickBoard  = (bool,boxIndex) => {
    //loading X for hit or O for miss into boardState arr (to determine winner later) and incrementing clickCount and decrementing torpedoCount
    console.log("handleClickBoard is running");
    let {boardState,clickCount,torpedoCount} = this.state
    if(bool){
      boardState[boxIndex] = "X";
    }else{
      boardState[boxIndex] = "O";
    }
    this.setState({boardState: boardState,clickCount: clickCount+1,torpedoCount: torpedoCount-1})
  }

  isHit = (boxIndex) => {
    //returns, 'hit' or 'miss'
    if(this.state.winArr.includes(boxIndex)){
      return true;
    }else{
      return false;
    }
  }
  isWinner = () => {
    //will determine if game is over
  }

}

export default Board;
