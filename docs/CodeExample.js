import React from 'react';
import ReactDOM from 'react-dom';
import { Animate } from '../src/Animate';

export default class CodeExample extends React.PureComponent {
  render() {
		const { code, example: Example } = this.props;
    return (
      <div className="code-container">
				<div className="code">{this.props.code}</div>
				{Example}
      </div>
    );
  }
}
