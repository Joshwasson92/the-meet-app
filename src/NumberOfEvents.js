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

    if (value <= 0 || value > 32) {
      this.setState({
        numberOfEvents: "",
        infoText: "Please enter a number from 1 to 32",
      });
    } else {
      this.setState({
        numberOfEvents: value,
        infoText: "",
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
