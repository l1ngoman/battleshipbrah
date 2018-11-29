import React, { Component } from 'react';
import './App.css';
import Box from './box.js'
import Boat from './Boat.js'

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      index: Array(100).fill(''), //empty arr to map over to create boxes
      boxArray: [], //array to hold all box components
      torpedoCount: 50, //decrements on every legal click
      startButtonOn: true, //toggles the ability to click either the start or reset buttons
      showBoatsEnabled: false, //toggles the ability to see where enemy ships are
      boardState: [], //array containing all hits and misses; parent state variable
      boats: [], //holds all game pieces (boat objects)
      winArr: [], //hold ship coordintes to find winner
      box: {
        id: '',
        isShip: false,
        isClicked: false,
        color: ["rgba(125,125,125,0)", "red", "white"],
      }
    }

  }
  render() {
    return (
      <div id="biggestDiv">
              <div className="messageBoard">
                Battleship!
                  <div id="ruleTitle">
                    Here are z rulez:
                      <p id="ruleList">
                        The object of the game is to sink all of your opponent{"\'"}s battleships. There are five ships to sink, but move wisely because you only have {this.state.torpedoCount} torpedos! Good luck, and don{"\'"}t fuck it up!!!
                      </p>
                  </div>
                  <div id="stats">
                    Torpedos: {this.state.torpedoCount}
                  </div>
              </div>
              <div className="gameboy">
                  <div className="gridBox" style={this.props.gridBoxStyle}>
                    {this.state.boxArray}
                  </div>
              </div>
              <div className="button">
                <div>
                  <button onClick={this.showBoats}>SHOW BOATS</button>
                  <button onClick={this.startGame}>START</button>
                  <button onClick={this.giveUp}>SURRENDER</button>
                  <button onClick={this.resetGame}>RESET</button>
                </div>
              </div>
      </div>
    );
  }

  handleClickBoard = (boxIndex) => {
    //loading X for hit or O for miss into boardState arr (to determine winner later) and incrementing clickCount and decrementing torpedoCount
    let {boardState,clickCount,torpedoCount} = this.state
    clickCount++
    torpedoCount--
    this.isHit(boxIndex) ? boardState[boxIndex] = "X" : boardState[boxIndex] = "O";
    //check for winner and handle accordingly
    if(this.isWinner(boardState)){
      alert("You won, bitch!")
      this.setState({boardState,clickCount,torpedoCount})
    }else if(torpedoCount<=0){
      alert("You ran out of torpedos, bitch!")
      this.setState({boardState,clickCount,torpedoCount})
    }else {
      this.setState({boardState,clickCount,torpedoCount})
    }
  }

  renderBoxes = (shipCoordinates) => {
    console.log(shipCoordinates);
    let { index, box } = this.state;
    let bool;
    let emoji;
    console.log(box.isShip);
    let boxes = index.map((el,i) => {
      if(shipCoordinates[0].includes(i) ||
         shipCoordinates[1].includes(i) ||
         shipCoordinates[2].includes(i) ||
         shipCoordinates[3].includes(i) ||
         shipCoordinates[4].includes(i))
      {
        bool = true;
        emoji = '🚢'
      }else{
        bool = false;
        emoji ='';
      }
      return(
        <Box id={i} emoji={emoji} isShip={bool} handleClickBoard={this.handleClickBoard} />
      )
    })
    console.log(shipCoordinates);
    console.log(box);
    return boxes
  }

  //returns, 'hit' or 'miss'
  isHit = (boxIndex) => {
    let {winArr} = this.state;
    let bool3 = false;
    for(let i=0;i<winArr.length;i++){
        if(winArr[i].includes(boxIndex)){
          bool3 = true;
          this.sunkAShip(i);
          break;
        }else{
          bool3 = false;
        }
    }
    return bool3;
  }

  //return an object w/ boolean and ship name
  sunkAShip = (lastBoatHit) => {
    let bool4 = false;
    let c2 = 0;
    let {winArr} = this.state;
    for(let i=0;i<winArr[lastBoatHit].length;i++){
      if(winArr[lastBoatHit][i]==='X'){
        c2++;
      }
    }
    if(c2 === winArr[lastBoatHit].length){
      alert("You sunk a battleship!")
    }
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

  startGame = () => {
    this.props.handleStart(1);
    let boats = new Boat;
    let { startButtonOn,index, winArr } = this.state
    winArr = boats.positionShips();
    let boxes;
    if(startButtonOn){
      boxes = this.renderBoxes(winArr);
      this.setState({winArr: winArr,boxArray: boxes,startButtonOn: false})
    }else{
      alert("The game has already started.");
    }
  }

  //handle click for SHOW BOATS button
  showBoats = () => {
    let {showBoatsEnabled,winArr} = this.state;
    if(!this.state.startButtonOn){
        showBoatsEnabled = !showBoatsEnabled;
        console.log("showBoatsEnabled changed from "+this.state.showBoatsEnabled+" to "+showBoatsEnabled);
        let boxes = this.renderBoxes()
        this.setState({showBoatsEnabled:showBoatsEnabled,boxArray:boxes});
    }else{
      console.log("showBoats button disabled");
    }
  }
  resetGame = () => {
    !this.state.startButtonOn ? console.log("Trying to reset game") : console.log("resetGame button disabled");
  }
  giveUp = () => {
    !this.state.startButtonOn ? console.log("Trying to surrender") : console.log("surrender button disabled");
  }
}

export default Board;
