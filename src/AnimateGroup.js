// @flow
import * as React from 'react';
import { Animate } from './Animate';
import mergeDiff, { type ChildWithStatus, Status } from './utils/mergeDiff';

type Props = {|
  children: React.Node,
  duration: number,
  onAnimateComplete?: () => void,
  type: 'slide' | 'fade',
|};

type State = {|
  animateCounter: number,
  renderChildren: Array<ChildWithStatus>
|};

class AnimateGroup extends React.Component<Props, State> {
  _mounted: boolean;

  state = {
    animateCounter: 0,
    renderChildren: React.Children.toArray(this.props.children).map(child => ({
      status: Status.static,
      child
    }))
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const newChildrenWithState = mergeDiff(
      prevState.renderChildren.map(childWithState => childWithState.child),
      React.Children.toArray(nextProps.children)
    );

    const animateCounter = newChildrenWithState.reduce(
      (counter, { child, status }) => (status !== Status.static ? counter + 1 : counter),
      prevState.animateCounter
    );

    return { renderChildren: newChildrenWithState, animateCounter };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps.children === this.props.children && nextState.renderChildren === this.state.renderChildren) {
      // Block the update if children render didn't change (so when animateCounter changes)
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { type, duration } = this.props;
    const { renderChildren } = this.state;
    return renderChildren.map(({ status, child }) => {
      return (
        <Animate
          animateOnInit={status !== Status.static}
          duration={duration}
          key={child.key}
          onAnimateComplete={this._handleEachAnimateComplete}
          show={status !== Status.out}
          type={type}
        >
          {child}
        </Animate>
      );
    });
  }

  _handleEachAnimateComplete = () => {
    const { animateCounter } = this.state;
    const { onAnimateComplete, children } = this.props;
    this.setState({ animateCounter: animateCounter - 1 }, () => {
      if (this.state.animateCounter === 0) {
        onAnimateComplete && onAnimateComplete();
        this._requestNewFrame(() => {
          this.setState({
            renderChildren: React.Children.toArray(children).map(child => ({
              status: Status.static,
              child
            }))
          });
        });
      }
    });
  };

  _requestNewFrame = (cb: () => void) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (this._mounted) {
          cb();
        }
      });
    });
  };
}

export default AnimateGroup;
