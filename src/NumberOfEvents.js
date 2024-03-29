import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

/**
 * Class component for updating total number of events that can be viewed.
 */
class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      numberOfEvents: 30,
      events: [],
      infoText: "",
    };
  }

  /**
   * Updates the state when the number of viewable events is changed.
   * @param {event} event
   */
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
