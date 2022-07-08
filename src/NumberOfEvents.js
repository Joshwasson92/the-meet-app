import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      numberOfEvents: 30,
      events: [],
      infoText: "",
    };
  }

  handleInputChanged = (event) => {
    const value = event.target.value;

    if (value <= 0 || value > 30) {
      this.setState({
        numberOfEvents: "30",
        infoText: "Please enter a number from 1 to 30",
      });
    } else {
      this.setState({
        numberOfEvents: value,
        infoText: "",
      });
    }
    if (this.props.updateNumberOfEvents) this.props.updateNumberOfEvents(value);
  };

  render() {
    return (
      <div className="events-number">
        <ErrorAlert text={this.state.infoText} />
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
