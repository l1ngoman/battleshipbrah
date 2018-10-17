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
    let style = {backgroundColor: this.props.colors[this.state.colorIndex]}
    return (
      <div className="App" style={style} onClick={this.handleClickBox}>
        🖕
      </div>
    );
  }
  handleClickBox  = () => {
    //runs on click of square
    //if isClicked is false, it calls the handleClickBoard function and changes color to red if hit or blue if miss
    console.log(" is running");
    let {isClicked,colorIndex} = this.state
    if(!isClicked){
      let bool = this.props.isHit();
      if(bool){
        colorIndex = 1;
      }else{
        colorIndex = 2;
      }
      isClicked = true;
      this.props.handleClickBoard(bool, this.props.id);
      this.setState({isClicked: isClicked})
    }else{
      console.log("isClicked is true");
    }
  }
}

export default Box;
