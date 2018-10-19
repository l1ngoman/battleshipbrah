import React, { Component } from 'react';
import './App.css';
import Box from './box.js'

class Board extends Component {
  constructor(props){
    super(props)

    this.state = {
      index: Array(100).fill(''), //empty arr to map over to create boxes
      boxArray: [], //array to hold all box components
      boardState: [], //array containing all hits and misses; parent state variable
      winArr: [], //hold ship coordintes to find winner
      torpedoCount: 50, //decrements on every legal click
      colors: ["rgba(125,125,125,0)", "red", "white"],
      startButtonOn: true, //toggles the ability to click either the start or reset buttons
      showBoatsEnabled: false, //toggles the ability to see where enemy ships are
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
                <button onClick={this.giveUp}>SURRENDER</button>
                <button onClick={this.resetGame}>RESET</button>
              </div>
      </div>
    );
  }

  startGame = () => {
    let {startButtonOn,index} = this.state
    let boxes;
    if(startButtonOn){
      this.positionShips();
      console.log(this.state.winArr);
      boxes = this.renderBoxes();
      this.setState({boxArray: boxes,startButtonOn: false})
    }else{
      console.log("start button disabled");
    }
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
    let tens;
    let ones;
    let newShipArr;
    //Determines veritcal or horizontal ship
    let axis = Math.floor(Math.random()*2)
    console.log("Axis: " + axis + "(0 for horizontal, 1 for vertical)");
    do{
      newShipArr =[]
        if(axis === 0){ //horizontal axis
          tens = (Math.floor(Math.random()*9)) * 10
          ones = Math.floor(Math.random()*handcuffs)
          for(let i=0;i<shipLength;i++){
            newShipArr.push(tens+ones+i);
          }
        }else{// vertical axis
          tens = (Math.floor(Math.random()*handcuffs)) * 10
          ones = Math.floor(Math.random()*9)
          for(let i=0;i<shipLength*10;i+=10){
            newShipArr.push(tens+ones+i);
          }
        }
        console.log(newShipArr);
    }while(this.state.winArr.length<1? false: !this.isValidShip(newShipArr))
    return newShipArr
  }
  //returns, 'hit' or 'miss'
  isHit = (boxIndex) => {
    let {winArr} = this.state;
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
    let {winArr} = this.state;
      for(let i=0;i<winArr.length;i++){
        for(let j=0;j<winArr[i].length;j++){
          if(bS[winArr[i][j]] === "X"){
            c++
          }
        }
      }
      console.log(bS);
      console.log(c);
    if(c===17){
      bool2 = true;
    }
    return bool2;
  }
  //returns boat emoji if game is won, no more Torpedos or if showBoatsEnabled is turned on (true)
  boatString = (boxID) => {
    let {torpedoCount,winArr} = this.state
    let emoji = ''
    for(let i=0;i<winArr.length;i++){
      for(let j=0;j<winArr[i].length;j++){
        if(boxID===winArr[i][j] && this.state.showBoatsEnabled){
          console.log("WinArr: "+winArr[i][j]);
          emoji = "🚢"
          break;
        }
      }
    }
    return emoji;
  }
  //handle click for SHOW BOATS button
  showBoats= () => {
    let {showBoatsEnabled,winArr} = this.state;
    if(!this.state.startButtonOn){
        if(showBoatsEnabled===true){
          showBoatsEnabled=false;
        }else{
          showBoatsEnabled=true;
        }
        console.log("showBoatsEnabled changed from "+this.state.showBoatsEnabled+" to "+showBoatsEnabled);
        let boxes = this.renderBoxes()
        this.setState({showBoatsEnabled:showBoatsEnabled,boxArray:boxes});
    }else{
      console.log("showBoats button disabled");
    }
  }
  resetGame = () => {
    if(!this.state.startButtonOn){
      console.log("Trying to reset game");
    }else {
      console.log("resetGame button disabled");
    }
  }
  giveUp = () => {
    if(!this.state.startButtonOn){
      console.log("Trying to surrender");
    }else{
      console.log("surrender button disabled");
    }
  }
  //takes in a newShipArr and returns false if the ship has the same value as another ship in the winArr or true if not
  //check if winArr contains a value in shipArr
  isValidShip = (shipArr) => {
    let {winArr} = this.state
    let bool;
    for (let i=0;i<winArr.length;i++) {
      for(let j=0;j<shipArr.length;j++){
        if(winArr[i].includes(shipArr[j])){
          console.log(`${winArr[i]} does have a ****************************${shipArr[j]}.`);
          return false;
        }else{
          console.log(`${winArr[i]} doesn't have ${shipArr[j]}.`);
          bool = true;
        }
      }
    }
    console.log(bool);
    return bool
  }
  renderBoxes = () => {
    let boxes = this.state.index.map((box,i) => {
      return(
        <Box id={i} isHit={this.isHit} colors={this.state.colors} handleClickBoard={this.handleClickBoard} winArr={this.state.winArr} resetGame={this.resetGame} boatString={this.boatString} showBoats={this.showBoats}/>
      )
    })
    return boxes
  }
  //Random numbers can't be the same for different ships
  //Need to set a state that deactivates the start game button
  //Need to print out status of ships, ie. sunk vs not sunk
  //Function to let user pick their ship positionShips
  //Function for computer to play against user
}

export default Board;
