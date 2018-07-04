import React from 'react';
import ReactDOM from 'react-dom';
import Animate from '../../src/Animate'

export default class ExampleAnimate1 extends React.PureComponent {
  state = { show: false };
  render() {
    return (
      <div className="example-root">
        <div className="example-toggle" onClick={this.toggleShow}>
          Click to toggle animation
        </div>
        <Animate show={this.state.show}>
          <div className="example-animate">
            <h3>This component slideUp and slideDown</h3>
          </div>
        </Animate>
        <div className="example-content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s.
          </p>
        </div>
      </div>
    );
  }
  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };
}
