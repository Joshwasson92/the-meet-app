import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  state = {
    events: [],
    filterEvents: [],
  };
  render() {
    const { events } = this.props;
    return (
      <ul className="events">
        {events.map((event) => (
          <li key={event.id}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;
