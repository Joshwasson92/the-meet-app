import React, { Component } from "react";

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.state = {
      numberOfEvents: 30,
    };
  }

  handleNumberChange = (events) => {
    const value = events.target.value;
    console.log(this.state.numberOfEvents);

    if (!isNaN(value) && value >= 1) {
      this.setState({ numberOfEvents: value });
    } else {
      alert("Enter a valid numerical amount.");
      return this.state.numberOfEvents;
    }
    this.props.handleNumberChange(undefined, value);
  };
  render() {
    return (
      <div className="numberOfEvents">
        Number of Events:
        <input
          className="events-number"
          type="number"
          placeholder={this.state.numberOfEvents}
          onChange={this.state.handleNumberChange}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
