// @flow
import * as React from 'react';
import { Animate } from './Animate';
import mergeDiff, { type ChildWithStatus, Status } from './utils/mergeDiff';

type Props = {|
  children: React.Node,
  duration?: number,
  onAnimateComplete?: () => void,
  type?: 'slide' | 'fade'
|};

type State = {|
  isAnimating: boolean,
  renderChildren: Array<ChildWithStatus>
|};

class AnimateGroup extends React.Component<Props, State> {
  _mounted: boolean;

  state = {
    isAnimating: false,
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

    if (!newChildrenWithState.every(child => child.status === Status.static)) {
      return { renderChildren: newChildrenWithState, isAnimating: true };
    } else {
      return null;
    }
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const { type, duration } = this.props;
    const { renderChildren } = this.state;
    return renderChildren.map(({ status, child }) => {
      return (
        <Animate
          appear={status !== Status.static}
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
    const { isAnimating } = this.state;
    const { onAnimateComplete, children } = this.props;
    if (isAnimating) {
      onAnimateComplete && onAnimateComplete();
      this.setState({
        renderChildren: React.Children.toArray(children).map(child => ({
          status: Status.static,
          child
        })),
        isAnimating: false
      });
    }
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
