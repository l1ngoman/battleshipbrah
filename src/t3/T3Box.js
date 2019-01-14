import React, { Component } from 'react';
import '../App.css'

class T3Box extends Component {

  render() {
    let style = {
      backgroundImage: `url(${this.props.bkgd})`,
      backgroundSize: "cover",
      height: "50px",
      width: "50px"
    }
    return (
      <div className="T3Box" onClick={this.handleClick}>
        <div style={style}>
        </div>
      </div>
    );
  }

  handleClick = () => {
    this.props.handleClickParent(this.props.id)

  }
}

export default T3Box;
