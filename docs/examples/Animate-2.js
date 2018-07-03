import React from 'react';
import ReactDOM from 'react-dom';
import Animate from '../../src/Animate'

export default class ExampleAnimate2 extends React.PureComponent {
  state = { show: false };
  render() {
    return (
      <div className="example-root">
        <div className="example-toggle" onClick={this.toggleShow}>
          Click to toggle header
        </div>
        <Animate show={this.state.show} type="fade">
          <div className="example-animate floating">
            <h3>This component fadeIn and fadeOut</h3>
          </div>
        </Animate>
      </div>
    );
  }
  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };
}
