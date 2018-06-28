import React from "react";
import ReactDOM from "react-dom";
import { Animate } from "../src/Animate";

import "./styles.css";

class App extends React.Component {
  state = { show: false };
  render() {
    return (
      <React.Fragment>
        <button onClick={this.toggleShow}>Toggle</button>
        <Animate show={this.state.show}>
          <div className="App">
            <h1>Hello HEll</h1>
            <h2>Start editing to see some magic happen!</h2>
          </div>
        </Animate>
      </React.Fragment>
    );
  }
  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
