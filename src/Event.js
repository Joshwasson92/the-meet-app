import React, { Component } from "react";

class Event extends Component {
  state = {
    collapsed: true,
  };

  /**
   * Function to display or hide a targetted event.
   */
  handleShowClick = () => {
    this.state.collapsed
      ? this.setState({ collapsed: false })
      : this.setState({ collapsed: true });
  };

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <h2 className="summary">{event.summary} </h2>
        <p className="location">{event.location}</p>
        <p className="starting-date">{event.start.dateTime}</p>
        <button className="show-button" onClick={() => this.handleShowClick()}>
          Show Details
        </button>
        {!this.state.collapsed && (
          <p className="event-description">{event.description}</p>
        )}{" "}
      </div>
    );
  }
}

export default Event;
