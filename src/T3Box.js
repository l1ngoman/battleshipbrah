import React, { Component } from 'react';
import './App.css'

class T3Box extends Component {
  render() {
    return (
      <div className="T3Box" onClick={this.handleClick}>
        {this.props.show}
      </div>
    );
  }

  handleClick = () => {
    this.props.handleClickParent(this.props.id)

  }
}

export default T3Box;
