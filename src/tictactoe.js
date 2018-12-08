import React, { Component } from 'react';
import T3Box from './T3Box'
import MessageBoard from './messageboard'
import { ButtonToolbar,ToggleButtonGroup,ToggleButton } from 'react-bootstrap';

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
      winner: false,
      version: [
                ['/images/marvel/ironman.png','/images/marvel/blackpanther.png','/images/marvel/deadpool.png','/images/marvel/rocket.png','/images/marvel/spiderman.png'],
                ['/images/dc/batman.png','/images/dc/wonderwoman.png','/images/dc/flash.png','/images/dc/aqua.png','/images/dc/cyborg.png']
              ],
      selectors: {
        p1: 0,
        p2: 0
      }
    }
  }
  render() {
    let { boxArr,version,moves,selectors } = this.state
    let boxes = boxArr.map((box,i) => {
      return box = <T3Box
                      key={i}
                      id={i}
                      bkgd={(() => {
                        switch(moves[i]){
                          case 'X': return version[0][selectors.p1];
                          case 'O': return version[1][selectors.p2];
                          default: return '';
                        }
                      })()}
                      version={version}
                      handleClickParent={this.handleClickParent}
                      />
    })

    return (
      <div id="page">
        <div id="innerPage">
          <ButtonToolbar id="p1" className="players">
            <img src="/images/marvel/marvelLogo.png" height="50px" width="50px" />
            <ToggleButtonGroup type="radio" name="p1" defaultValue={0}>
              <ToggleButton value={0} onChange={this.toggleEmoji}>
                <img className="T3Emojis" src={version[0][0]} />
              </ToggleButton>
              <ToggleButton value={1} onChange={this.toggleEmoji}>
                <img className="T3Emojis" src={version[0][1]} />
              </ToggleButton>
              <ToggleButton value={2} onChange={this.toggleEmoji}>
                <img className="T3Emojis" src={version[0][2]} />
              </ToggleButton>
              <ToggleButton value={3} onChange={this.toggleEmoji}>
                <img className="T3Emojis" src={version[0][3]} />
              </ToggleButton>
              <ToggleButton value={4} onChange={this.toggleEmoji}>
                <img className="T3Emojis" src={version[0][4]} />
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>

          <div className="T3Board">
            {boxes}
          </div>

          <ButtonToolbar id="p2" className="players">
            <img src="/images/dc/dcLogo.png" height="40px" width="40px" />
            <ToggleButtonGroup type="radio" name="p2" defaultValue={0}>
              <ToggleButton value={0} onChange={this.toggleEmoji}>
                <img className="T3Emojis" src={version[1][0]} />
              </ToggleButton>
              <ToggleButton value={1} onChange={this.toggleEmoji}>
                <img className="T3Emojis" src={version[1][1]} />
              </ToggleButton>
              <ToggleButton value={2} onChange={this.toggleEmoji}>
                <img className="T3Emojis" src={version[1][2]} />
              </ToggleButton>
              <ToggleButton value={3} onChange={this.toggleEmoji}>
                <img className="T3Emojis" src={version[1][3]} />
              </ToggleButton>
              <ToggleButton value={4} onChange={this.toggleEmoji}>
                <img className="T3Emojis" src={version[1][4]} />
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>

        </div>
        <MessageBoard game={2}/>
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
        setTimeout(function(){alert(`Player ${moves[a]} won!!`)},50);
        bool = true;
        return bool;
      }else {
        bool = false;
      }
    }
    return bool
  }

  toggleEmoji = (e) => {
    let { selectors } = this.state
    console.log("name: "+e.target.name);
    console.log("value: "+e.target.value);
    selectors[e.target.name] = e.target.value
    this.setState({selectors})
  }

}

export default TicTacToe;
