import React from 'react';
import ReactDOM from 'react-dom';
import { Animate } from '../src/Animate';

import ExampleAnimate1 from './examples/Animate-1';
import ExampleAnimate2 from './examples/Animate-2';
import ExampleAnimateGroup from './examples/AnimateGroup';
import CodeExample from './CodeExample';

import './styles.css';

class App extends React.Component {
  state = { floatingNav: false, narrowScreen: false };

  componentDidMount() {
    window.onscroll = () => {
      const { floatingNav } = this.state;
      if (window.pageYOffset >= 180 && !floatingNav) {
        this.setState({ floatingNav: true });
      }
      if (window.pageYOffset < 180 && floatingNav) {
        this.setState({ floatingNav: false });
      }
    };

    if (window.innerWidth < 800) {
      this.setState({ narrowScreen: true });
    }
  }

  render() {
    const { floatingNav, narrowScreen } = this.state;
    const floatingRightCSS = narrowScreen ? 'floating-right' : 'floating-right right-margin';
    return (
      <React.Fragment>
        <div className="floating-nav-fixed">
          <Animate show={floatingNav}>
            <div className="floating-nav">
              <ul className={floatingRightCSS}>
                <li>
                  <a href="#" onClick={this.scrollToAnimateSection}>
                    Animate
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.scrollToAnimateGroupSection}>
                    AnimateGroup
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.scrollToGithubSection}>
                    Github
                  </a>
                </li>
              </ul>
              {narrowScreen ? null : <div className="floating-left">React Animate Mount</div>}
            </div>
          </Animate>
        </div>
        <div className="root">
          <Animate appear duration={750} show>
            <h1 className="header">React Animate Mount</h1>
            <h3 className="header-sub">Simple and light component for animating mount and unmount</h3>
          </Animate>
          <ul className="nav">
            <li>
              <a href="#" onClick={this.scrollToAnimateSection}>
                Animate
              </a>
            </li>
            <li>
              <a href="#" onClick={this.scrollToAnimateGroupSection}>
                AnimateGroup
              </a>
            </li>
            <li>
              <a href="#" onClick={this.scrollToGithubSection}>
                Github
              </a>
            </li>
          </ul>
          <section className="section" id="animate" ref={this._animateSectionRef}>
            <h2 className="section-header">&#60; Animate /&#62;</h2>
            <p className="section-text">
              SlideUp / SlideDown component (animate height 0 and 'auto', like this page's floating nav)
            </p>
            <CodeExample
              code={
                <React.Fragment>
                  <div className="code-red">{`<Animate show={this.state.show} />`}</div>
                  <div>{`  <div className="example-animate">`}</div>
                  <div>{`    <h2>This component slideUp and slideDown</h2>`}</div>
                  <div>{`  </div>`}</div>
                  <div className="code-red">{`</Animate>`}</div>
                </React.Fragment>
              }
              example={<ExampleAnimate1 />}
            />
            <p className="section-text">FadeIn / FadeOut component (animate opacity 0 and 1)</p>
            <CodeExample
              code={
                <React.Fragment>
                  <div className="code-red">
                    <span>{`<Animate show={this.state.show} `}</span>
                    <span className="code-purple">{`type="fade" `}</span>
                    <span>{`/>`}</span>
                  </div>
                  <div>{`  <div className="example-animate">`}</div>
                  <div>{`    <h2>This component fadeIn and fadeOut</h2>`}</div>
                  <div>{`  </div>`}</div>
                  <div className="code-red">{`</Animate>`}</div>
                </React.Fragment>
              }
              example={<ExampleAnimate2 />}
            />
            <p className="section-text">Or simply animateIn on mount (like this page's header) </p>
            <CodeExample
              code={
                <React.Fragment>
                  <div className="code-red">
                    <span>{`<Animate `}</span>
                    <span className="code-purple">{`appear `}</span>
                    <span>{`show />`}</span>
                  </div>
                  <div>{`  <h1>React Animate Mount</h1>`}</div>
                  <div>{`  <h3> Simple and light component... </h3>`}</div>
                  <div className="code-red">{`</Animate>`}</div>
                </React.Fragment>
              }
            />
          </section>
          <section className="section" id="animate-group" ref={this._animateGroupSectionRef}>
            <h2 className="section-header">&#60; AnimateGroup /&#62;</h2>
            <p className="section-text">Animate items when they are added / removed from a list</p>
            <CodeExample
              code={
                <React.Fragment>
                  <div className="code-red">{`<AnimateGroup>`}</div>
                  <div>{`  {items.map(item => (<Item key=... data=... />)}`}</div>
                  <div className="code-red">{`</AnimateGroup>`}</div>
                </React.Fragment>
              }
              example={<ExampleAnimateGroup />}
            />
          </section>
          <section className="section" id="github" ref={this._githubSectionRef}>
            <h2 className="section-header">Github</h2>
            <a href="https://github.com/MingruiZhang/react-animate-mount" className="section-text" target="_blank">
              https://github.com/MingruiZhang/react-animate-mount
            </a>
          </section>
        </div>
      </React.Fragment>
    );
  }

  scrollToAnimateSection = event => {
    event.preventDefault();
    this.scrollToSection(this._animateSectionNode);
  };

  scrollToAnimateGroupSection = event => {
    event.preventDefault();
    this.scrollToSection(this._animateGroupSectionNode);
  };

  scrollToGithubSection = event => {
    event.preventDefault();
    this.scrollToSection(this._githubSectionNode);
  };

  scrollToSection = node => {
    const behavior = 'scrollBehavior' in document.documentElement.style ? 'smooth' : undefined;

    if (node instanceof window.HTMLElement) {
      const { top } = node.getBoundingClientRect();
      const windowTop = window.pageYOffset;
      window.requestAnimationFrame(() =>
        window.scrollTo({
          top: Math.max(windowTop + top - 60, 0),
          left: 0,
          behavior
        })
      );
    }
  };

  _animateSectionRef = elementRef => {
    this._animateSectionNode = ReactDOM.findDOMNode(elementRef);
  };

  _animateGroupSectionRef = elementRef => {
    this._animateGroupSectionNode = ReactDOM.findDOMNode(elementRef);
  };

  _githubSectionRef = elementRef => {
    this._githubSectionNode = ReactDOM.findDOMNode(elementRef);
  };
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
