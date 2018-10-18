import React, { Component } from 'react';
import './App.css';
import Box from './box.js'
import BattleStart from './battleship_start.jpg'

class Board extends Component {
  constructor(props){
    super(props)

    this.state = {
      torpedoCount: 50, //parent, state variable; torpedoCount will decrement on every legal click
      clickCount: 0, //parent, state variable; will increment on every legal click; keeps track of turns
      boardState: [], //array containing all hits and misses; parent state variable
      colors: ["rgba(125,125,125,0)", "red", "white"], //green = unclicked, red = isHit() = true, blue = isHit() = false; parent, state; variable; pass to to child
      showBoatsEnabled: false,
      boxArray: [],
    }
  }
  render() {

    return (
      <div id="biggestDiv">
              <div className="messageBoard">
                You is playin da battleships!
                  <div id="ruleTitle">
                    Here are z rulez:
                      <p id="ruleList">
                        The object of the game is to sink all of your opponent{"\'"}s battleships. There are five ships to sink, but move wisely because you only have {this.state.torpedoCount} torpedos! Good luck, and don{"\'"}t fuck it up!!!
                      </p>
                  </div>
                  <div id="stats">
                    Torpedos remaining: {this.state.torpedoCount}
                  </div>
              </div>
                <div id="spacer"></div>
              <div className="gridBox">
                {this.state.boxArray}
              </div>
              <div className="button">
                <button onClick={this.showBoats}>SHOW BOATS</button>
                <button onClick={this.startGame}>START</button>
                <button onClick={this.resetGame}>RESET</button>
              </div>
      </div>
    );
  }

  startGame = () => {
    //this.props.positionShips();
    let boxes = this.props.index.map((box,i) => {
      return(
        <Box id={i} isHit={this.isHit} colors={this.state.colors} handleClickBoard={this.handleClickBoard} winArr={this.props.winArr} resetGame={this.props.resetGame} boatString={this.boatString}/>
      )
    })
    this.setState({boxArray:boxes})
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

    //console.log(this.state.boardState); //logs current array of hits and misses
    if(this.isWinner(boardState)){
      alert("You won, bitch!")
      this.setState({boardState: boardState,clickCount: clickCount,torpedoCount: torpedoCount})
    }else if(torpedoCount<=0){
      alert("You ran out of torpedos, bitch!")
      this.setState({boardState: boardState,clickCount: clickCount,torpedoCount: torpedoCount})
      this.resetGame();
    }else{
      this.setState({boardState: boardState,clickCount: clickCount,torpedoCount: torpedoCount})
    }
  }
  //returns, 'hit' or 'miss'
  isHit = (boxIndex) => {
    let {winArr} = this.props;
    let bool3 = false;
    for(let i=0;i<winArr.length;i++){
        if(winArr[i].includes(boxIndex)){
          bool3 = true;
          break;
        }else{
          bool3 = false;
        }
    }
    return bool3;
  }
  //return true or false
  isWinner = (bS) => {
    let bool2 = false;
    let c = 0;
    let {winArr} = this.props;
      for(let i=0;i<winArr.length;i++){
        for(let j=0;j<winArr[i].length;j++){
          if(bS[winArr[i][j]] === "X"){
            c++
          }
        }
      }
    if(c===17){
      bool2 = true;
    }
    return bool2;
  }
  //returns boat emoji if game is won, no more Torpedos or if showBoatsEnabled is turned on (true)
  boatString = (boxID) => {
    let {winArr} = this.props
    let {torpedoCount,boardState,showBoatsEnabled} = this.state
    let emoji = ''
    for(let i=0;i<winArr.length;i++){
      for(let j=0;j<winArr[i].length;j++){
        if((boxID ===winArr[i][j]) && (torpedoCount < 1) || showBoatsEnabled && (boxID ===winArr[i][j])){
          emoji = "🚢"
        }
      }
    }
    return emoji;
  }
  //handle click for SHOW BOATS button
  showBoats= () => {
    let {showBoatsEnabled} = this.state;
    if(showBoatsEnabled===false){
      showBoatsEnabled = true;
    }else{
      showBoatsEnabled = false;
    }
    console.log(this.state.showBoatsEnabled);
    this.startGame();
    this.setState({showBoatsEnabled: showBoatsEnabled})
  }
  resetGame = () => {
    console.log("Trying to reset game");
  }
}

export default Board;
