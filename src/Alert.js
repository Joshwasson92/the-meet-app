import React, { Component } from "react";

/**
 * Class component for Alert notifications
 */
class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

/**
 * Blue snackbar
 */
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "blue";
  }
}
/**
 * Red snackbar
 */
class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "red";
  }
}
/**
 * Offline red snackbar
 */
class OfflineAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "red";
  }
}

export { InfoAlert, ErrorAlert, OfflineAlert };
