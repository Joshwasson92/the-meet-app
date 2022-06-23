import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

class AppSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <ClipLoader
          cssOverride={override}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
          speedMultiplier={1.5}
        />
      </div>
    );
  }
}

export default AppSpinner;
