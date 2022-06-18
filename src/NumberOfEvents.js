import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 30,
  };

  handleNumberChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 1) {
      this.setState({ numberOfEvents: value });
    } else {
      alert("Enter a valid numerical amount.");
      return this.state.numberOfEvents;
    }
    this.props.numberChange(undefined, value);
  };
  render() {
    return (
      <div className="numberOfEvents">
        Number of Events:
        <input
          className="events-number"
          // type="number"
          value={this.props.NumberOfEvents}
          onChange={this.handleNumberChange}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
