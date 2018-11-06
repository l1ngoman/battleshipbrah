import React, { Component } from 'react';
import './App.css';

class Box extends Component {
  constructor(props){
    super(props)

    this.state = {
      isClicked: false, //child, state variable
      colorIndex: 0,

    }
  }
  render() {
    let color = this.props.colors[this.state.colorIndex];
    let style = {
      backgroundColor: color,
      border: "1px solid darkgreen",
      float: "left",
      width: "38px",
      height: "34.8px",
    }
    return (
      <button  style={style} onClick={this.handleClickBox}>
        {this.props.boatString(this.props.id)}
      </button>
    );
  }
  handleClickBox  = () => {
    //runs on click of square
    //if isClicked is false, it calls the handleClickBoard function and changes color to red if hit or blue if miss
    let {isClicked,colorIndex} = this.state
    if(!isClicked){
      let bool = this.props.isHit(this.props.id);
      if(bool){
        colorIndex = 1;
      }else{
        colorIndex = 2;
      }
      isClicked = true;

      this.props.handleClickBoard(bool, this.props.id);
      this.setState({isClicked: isClicked,colorIndex: colorIndex})
    }
  }
}

export default Box;
