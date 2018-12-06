import React, { Component } from 'react';
import './App.css';
import Battleship from './battleship';
import TicTacToe from './tictactoe'


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      bkgd:
      [{
        image: './images/gameboyStart.bmp'
      },
      {
        image: './images/battleship.jpg'
      }],
      index: 0,
      game: 1
    }
  }

  render() {
    let style = {
      backgroundImage: `url(${this.state.bkgd[this.state.index].image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      border: "5px solid black",
      maxWidth: "380px",
      maxHeight: "350px",
      minWidth: "382px",
      marginTop: "31px",
      marginLeft: "154px"
    }
    return (
      <main>
          <div className="App">
          {(() => {
            switch(this.state.game){
            case 0: return <h1>Case 0</h1>;
            case 1: return <Battleship gridBoxStyle={style} handleStart={this.handleStart}/>;
            case 2: return <TicTacToe />;
          }
          })()}
          </div>
      </main>
    );
  }

  handleStart = (i) => {
    this.setState({index: i})
  }

}

export default App;
