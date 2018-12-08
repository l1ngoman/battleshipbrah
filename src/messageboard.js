import React, { Component } from 'react';
import './App.css';

class MessageBoard extends Component {
  constructor(props){
    super(props)
    this.state={
      title: ['Battleship', 'TicTacToe'],
      rules: ["The object of the game is to sink all of your opponent's battleships. There are five ships to sink, but move wisely because you have limited torpedos! Good luck!!!",
              "Grab a friend! Use the select button to switch your team! Get three in a row to win!!!"
             ],
      icon: ["./images/torpedoIcon.png","/images/t3Icon.jpg"],
      showRulez: false
    }
  }

  render() {
    let { title, rules, showRulez, icon } = this.state
    let { game } = this.props
    return (
            <div className="messageBoard">
              {title[game-1]}
              <img src="./images/infoIcon.png" onClick={this.handleClick}/>
              {showRulez && <p className="ruleList">{rules[game-1]}</p>}
              <div className="icons">
                <div className="iconPic">
                  <img src={icon[game-1]}/>
                  {this.props.torpedoCount}
                </div>
                <div className="buttons">
                  <div id="buttons" title="Show Boats" onClick={this.props.showBoats}></div>
                  <div id="buttons" title="Start"onClick={this.props.startGame}></div>
                </div>
              </div>
            </div>
    );
  }

  componentDidMount(){

  }

  handleClick = () => {
    let { showRulez } = this.state
    this.setState({showRulez: !showRulez})
  }
}

export default MessageBoard
