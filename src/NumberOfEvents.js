import React, { Component } from "react";

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.state = {
      numberOfEvents: 30,
    };
  }

  handleInputChanged = (event) => {
    const value = event.target.value;

    if (value <= 0 || value > 30) {
      alert("Please enter a valid number from 1 to 30");
      this.setState({
        numberOfEvents: "30",
        infoText: "Please enter a number from 1 to 30",
      });
    } else {
      this.setState({
        numberOfEvents: value,
        infoText: "Please enter a valid number",
      });
    }
    this.props.updateNumberOfEvents(value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <p className="numbercount">Number of events</p>
        <input
          type="number"
          className="numberinput"
          onChange={this.handleInputChanged}
          value={this.state.numberOfEvents}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
