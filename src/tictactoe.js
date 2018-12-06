import React, { Component } from 'react';
import T3Box from './T3Box'

class TicTacToe extends Component {
  constructor(props){
    super(props)

    this.state = {
      boxArr: Array(9).fill(''),
      moves: Array(9).fill(''),
      clickCount: 1,
      winArr: [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6],
              ],
      winner: false
    }
  }
  render() {
    let { boxArr } = this.state
    let boxes = boxArr.map((box,i) => {
      return box = <T3Box key={i} id={i} show={this.state.moves[i]} handleClickParent={this.handleClickParent}/>
    })

    return (
      <div className="board">
        {boxes}
      </div>
    );
  }


  handleClickParent = (boxID) => {
    let { clickCount, moves, winner } = this.state;

    if(moves[boxID] === '' && clickCount > 0){
      clickCount % 2 == 1 ? moves[boxID] = 'X' : moves[boxID] = 'O';
      clickCount += 1;
    }

    winner = this.checkWinner();
    if(winner){
      clickCount = -1;
    }
    this.setState({clickCount, moves, winner})
  }

  checkWinner = () => {
    let { winArr,moves } = this.state
    let bool = "default";
    //check moves' values to see if indexes of those values exist in winArr
    //if moves[winArr[0][0]] == moves[winArr[0][1]] == moves[winArr[0][2]]
    for(let i=0;i<winArr.length;i++) {
      let [a,b,c] = winArr[i]
      if(moves[a] != '' && moves[a] === moves[b] && moves[b] === moves[c]){
        alert("Winner!");
        bool = true;
        return bool;
      }else {
        bool = false;
      }
    }
    return bool
  }

}

export default TicTacToe;
