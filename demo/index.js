import React from 'react';
import ReactDOM from 'react-dom';
import { Animate } from '../src/Animate';

import ExampleAnimate1 from './examples/Animate-1';
import ExampleAnimate2 from './examples/Animate-2';
import ExampleAnimateGroup from './examples/AnimateGroup';
import CodeExample from './CodeExample';


import './styles.css';

class App extends React.Component {
  render() {
    return (
      <div className="root">
        <Animate animateOnInit duration={750} show>
          <h1 className="header">React Animate Mount</h1>
          <h3 className="header-sub">Simple and light component for animating mount and unmount</h3>
        </Animate>
        <ul className="nav">
          <li>Animate</li>
          <li>AnimateGroup</li>
          <li>Github</li>
        </ul>
        <section className="section">
          <h2 className="section-header">&#60; Animate /&#62;</h2>
          <p className="section-text">SlideUp / SlideDown component (animate height 0 and 'auto')</p>
          <CodeExample
            code={`
        <Animate show={this.state.show} />
          <div className="example-animate">
            <h2>This is an animated header</h2>
          </div>
        </Animate>
        `}
            example={<ExampleAnimate1 />}
          />
          <p className="section-text">FadeIn / FadeOut component (animate opacity 0 and 1)</p>
          <CodeExample
            code={`
        <Animate show={this.state.show} type="fade" />
          <div className="example-animate floating">
            <h2>This is an animated header</h2>
          </div>
        </Animate>
        `}
            example={<ExampleAnimate2 />}
          />
          <p className="section-text">Or simply animateIn on mount (like this page's header) </p>
          <CodeExample
            code={`
        <Animate animateOnInit show />
          <h1>React Animate Mount</h1>
          <h3> Simple and light component... </h3>
        </Animate>
        `}
          />
        </section>
        <section className="section">
          <h2 className="section-header">&#60; AnimateGroup /&#62;</h2>
          <p className="section-text">Animate items when they are added / removed from a list</p>
          <CodeExample
            code={`
        <AnimateGroup>
          {items.map(item => (<Item key=... data=... />)}
        </AnimateGroup>
      `}
            example={<ExampleAnimateGroup />}
          />
        </section>
        <section className="section">
          <h2 className="section-header">Github</h2>
          <a href="https://github.com/MingruiZhang/react-animate-mount" className="section-text" target="_blank">https://github.com/MingruiZhang/react-animate-mount</a>
        </section>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
