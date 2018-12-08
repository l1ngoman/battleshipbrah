import React, { Component } from 'react';
import './App.css';
import Battleship from './battleship';
import TicTacToe from './tictactoe';
import Home from './home';
import { ButtonToolbar,ToggleButtonGroup,ToggleButton } from 'react-bootstrap';


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
      game: 0 
    }
  }

  render() {
    let { game } = this.state
    let style = {
      backgroundImage: `url(${this.state.bkgd[this.state.index].image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      border: "5px solid black",
      maxWidth: "380px",
      maxHeight: "350px",
      minWidth: "382px",
    }
    return (
      <main>
        <ButtonToolbar id="radio">
          <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
            <ToggleButton value={0} onChange={this.toggleGame}>None</ToggleButton>
            <ToggleButton value={1} onChange={this.toggleGame}>Battleship</ToggleButton>
            <ToggleButton value={2} onChange={this.toggleGame}>TicTacToe</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>

        {game==0 && <Home />}
        {game==1 && <Battleship gridBoxStyle={style} handleStart={this.handleStart}/>}
        {game==2 && <TicTacToe />}

      </main>
    );
  }

  handleStart = (i) => {
    this.setState({index: i})
  }

  toggleGame = (e) => {
    let {game} = this.state
    game = e.target.value
    this.setState({game})
  }

}

export default App;
