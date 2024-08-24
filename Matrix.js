// src/Matrix.js
import React, { Component } from 'react';
import './Matrix.css'; // Import the CSS file for styling

class Matrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: Array(9).fill(null), // Initialize 9 boxes with null values
      clickOrder: [], // Track the order of clicks
      isLastBoxClicked: false, // Track if the last box is clicked
    };
  }

  handleClick = (index) => {
    const { boxes, clickOrder, isLastBoxClicked } = this.state;

    // Update the state with the clicked box
    if (!isLastBoxClicked) {
      const updatedBoxes = boxes.slice();
      updatedBoxes[index] = 'green'; // Change the clicked box color to green

      const newClickOrder = [...clickOrder, index];

      this.setState({
        boxes: updatedBoxes,
        clickOrder: newClickOrder,
      });

      // Check if this is the last box
      if (newClickOrder.length === 9) {
        this.setState({ isLastBoxClicked: true });
        setTimeout(() => this.changeAllToOrange(), 1000); // Change all to orange after a delay
      }
    }
  };

  changeAllToOrange = () => {
    const { clickOrder } = this.state;
    const updatedBoxes = Array(9).fill(null); // Reset boxes to initial state

    // Change all boxes to orange in the order of clicks
    clickOrder.forEach((index, i) => {
      setTimeout(() => {
        updatedBoxes[index] = 'orange';
        this.setState({ boxes: updatedBoxes });
      }, i * 500); // Delay each update by 500ms
    });
  };

  render() {
    const { boxes } = this.state;

    return (
      <div className="matrix">
        {boxes.map((color, index) => (
          <div
            key={index}
            className="box"
            style={{ backgroundColor: color }}
            onClick={() => this.handleClick(index)}
          />
        ))}
      </div>
    );
  }
}

export default Matrix;
