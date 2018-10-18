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
      colors: ["rgba(125,125,125,0)", "red", "blue"], //green = unclicked, red = isHit() = true, blue = isHit() = false; parent, state; variable; pass to to child
    }
  }
  render() {
    let boxes = this.props.index.map((box,i) => {
      return(
        <Box id={i} isHit={this.isHit} colors={this.state.colors} handleClickBoard={this.handleClickBoard} winArr={this.props.winArr} resetGame={this.props.resetGame} boatString={this.boatString}/>
      )
    })
    return (
      <div id="biggestDiv">
              <div className="messageBoard">
                You is playin da battleships!
                  <div id="ruleTitle">
                    Here are z rulez:
                      <p id="ruleList">
                        The object of the game is to sink all of your opponent{"\'"}s battleships. In this version, there are five, single-length ships to sink. Move wisely, though, because you only have 25 torpedos! Good luck, and don{"\'"}t fuck it up!!!
                      </p>
                  </div>
                  <div id="stats">
                    Torpedos remaining: {this.state.torpedoCount}
                  </div>
              </div>
              
              <div className="sparkleBox">
              {boxes}
              </div>
      </div>
    );
  }

  handleClickBoard  = (bool,boxIndex) => {
    //loading X for hit or O for miss into boardState arr (to determine winner later) and incrementing clickCount and decrementing torpedoCount
    console.log("handleClickBoard is running");
    let {boardState,clickCount,torpedoCount} = this.state
    clickCount++
    torpedoCount--
    if(bool){
      boardState[boxIndex] = "X";
    }else{
      boardState[boxIndex] = "O";
    }

    console.log(this.state.boardState);
    if(this.isWinner(boardState)){
      alert("You won, bitch!")
      console.log("You won, bitch!");
      this.setState({boardState: boardState,clickCount: clickCount,torpedoCount: torpedoCount})
    }else if(torpedoCount<=0){
      alert("You ran out of torpedos, bitch!")
      console.log("You ran out of torpedos, bitch!");
      this.setState({boardState: boardState,clickCount: clickCount,torpedoCount: torpedoCount})
      this.props.resetGame();
    }else{
      this.setState({boardState: boardState,clickCount: clickCount,torpedoCount: torpedoCount})
    }
  }

  isHit = (boxIndex) => {
    //returns, 'hit' or 'miss'
    if(this.props.winArr.includes(boxIndex)){
      return true;
    }else{
      return false;
    }
  }
  //return true or false
  isWinner = (bS) => {
    let bool2 = false;
    let c = 0;
    let {winArr} = this.props;
      for(let i=0;i<5;i++){
        if(bS[winArr[i]] === "X"){
          c++
        }
      }
    if(c===5){
      bool2 = true;
    }
    return bool2;
  }
  //returns boat emoji or not
  boatString = (boxID) => {
    let emoji = ''
    for(let i=0;i<this.props.winArr.length;i++){
      if(boxID === this.props.winArr[i] && this.state.torpedoCount < 1){
        emoji = "🚢"
      }
    }
    return emoji;
  }
}

export default Board;
