import React from 'react';
import ReactDOM from 'react-dom';
import { Animate } from '../src/Animate';

export default class CodeExample extends React.PureComponent {
  render() {
		const { code, example } = this.props;
    return (
      <div className="code-container">
				<div className="code">{code}</div>
				{example}
      </div>
    );
  }
}
