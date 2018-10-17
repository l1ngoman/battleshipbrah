import React, { Component } from 'react';
import './App.css';
import Board from './board.js';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      index: [], //hold all the boxes; will need to loop out to create 100 and then map boxes into it;
      userName: '',//hold the name of the player
      winArr: [], //hold ship coordintes to find winner
    }
  }
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
  startGame = () => {
    this.getUsername(); //re-renders every time we set state... fix later
    this.positionShips();
    this.setGameBoard();
  }
  getUsername = () => {
    let {userName} = this.state
    let confirmName = '';
    let sent = 0
    do{
    userName = prompt("Hello, player! What's your name?");
    confirmName = prompt(`Did you say ${userName}? (Y/N)`);
    confirmName = confirmName.toLowerCase();
    alert("You typed: " + confirmName)
    if(confirmName=='y'){
      alert(`Hello, ${userName}!`)
      sent = 1
    }else{
      alert("Well fine then...")
    }
  }while(sent != 1);
  alert("We left the loop");
    this.setState({userName: userName})
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
  setGameBoard = () => {
    let {index} = this.state;
    //make index into an array of 100 empty ''
    for(let i=0;i<100;i++){
      index.push('');
    }
    this.setState({index: index})
  }
}

export default App;
