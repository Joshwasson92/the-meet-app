import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import { OfflineAlert } from "./Alert";
import EventGenre from "./EventGenre";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 30,
    location: "all",
  };

  async componentDidMount() {
    await getEvents().then((events) => {
      this.setState({
        events: events.events,
        locations: extractLocations(events.events),
        filteredEvents: this.state.events,
      });
    });
    if (!navigator.onLine) {
      this.setState({
        offlineText: "No connection deleted, loading saved events.",
      });
    } else {
      this.setState({
        offlineText: "",
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Updates the state based on the number of events selected.
   * @param {number} numberOfEvents
   */
  updateNumberOfEvents = (numberOfEvents) => {
    this.setState({
      numberOfEvents,
    });
    this.updateEvents(this.state.locations, numberOfEvents);
  };

  /**
   * Pulls all events or filters depending on what has been entered into the location input field.
   * @param {string} location
   * @param {number} eventCount
   */
  updateEvents = (location = "all", eventCount = this.state.numberOfEvents) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((response) => {
        const locationEvents =
          location === "all"
            ? response.events
            : response.events.filter((event) => event.location === location);
        const events = locationEvents.slice(0, numberOfEvents);
        return this.setState({
          events: events,
          currentLocation: location,
          locations: response.locations,
        });
      });
    } else {
      getEvents().then((response) => {
        const locationEvents =
          currentLocation === "all"
            ? response.events
            : response.events.filter(
                (event) => event.location === currentLocation
              );
        const events = locationEvents.slice(0, 30);
        return this.setState({
          events: events,
          numberOfEvents: 30,
          locations: response.locations,
        });
      });
    }
  };

  /**
   *
   * @returns events based on the location.
   */
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    return (
      <div className="App">
        <OfflineAlert text={this.state.infoText} />

        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />

        <NumberOfEvents
          events={this.state.events}
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />

        <h4>Events in each city</h4>
        <EventGenre events={this.state.events} />
        <ResponsiveContainer height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              type="number"
              dataKey="number"
              name="number of events"
              allowDecimals={false}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
