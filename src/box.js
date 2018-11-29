import React, { Component } from 'react';
import './App.css';

class Box extends Component {
  constructor(props){
    super(props)

    this.state = {
      color: ["rgba(125,125,125,0)", "red", "white"],
      }
  }
  render() {
    let index;
    this.props.isShip ? index = 1 : index = 2
    let style = {
      backgroundColor: this.state.color[index],
      border: "1px solid darkgreen",
      float: "left",
      width: "38px",
      height: "34.8px",
    }
    return (
      <button  style={style} onClick={this.handleClickBox}>
        {this.props.emoji}
      </button>
    );
  }


  handleClickBox  = () => {
    //runs on click of square
    //if isClicked is false, it calls the handleClickBoard function and changes color to red if hit or blue if miss
    if(this.props.isShip){
      console.log(`I'm a ship! (${this.props.id})`);
    }
    let {isClicked,colorIndex} = this.state;
      this.props.handleClickBoard(this.props.id);
      this.setState({isClicked: isClicked,colorIndex: colorIndex})
  }
}

export default Box;
