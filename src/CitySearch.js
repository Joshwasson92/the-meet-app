import React, { Component } from "react";
import { InfoAlert } from "./Alert";
class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    showSuggestions: undefined,
  };

  /**
   * Function to changing of locations.
   * @param {event} event
   */
  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((locations) => {
      return locations.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          "We can not find the city you are looking for, please try another city",
      });
    } else {
      this.setState({
        query: value,
        suggestions,
        infoText: "",
      });
    }
  };
  /**
   * Function to display suggested events.
   * @param {string} suggestion
   */
  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText: "",
    });

    this.props.updateEvents(suggestion);
  };

  render() {
    const { query } = this.state;
    return (
      <div className="CitySearch">
        <InfoAlert text={this.state.infoText} />
        <input
          type="text"
          className="city"
          value={query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        />
        <ul
          className="suggestions"
          style={this.state.showSuggestions ? {} : { display: "none" }}
        >
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li key="all" onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
