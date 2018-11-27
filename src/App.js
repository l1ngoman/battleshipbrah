import React, { Component } from 'react';
import './App.css';
import Board from './board.js';


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
      index: 0
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
            <Board gridBoxStyle={style} handleStart={this.handleStart}/>
          </div>
      </main>
    );
  }

  handleStart = (i) => {
    this.setState({index: i})
  }

}

export default App;
