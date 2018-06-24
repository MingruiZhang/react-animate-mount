// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, View } from 'react-native';

type AnimateSpeedEnum = $Keys<typeof AnimateSpeed>;
const AnimateSpeed = Object.freeze({
  fast: 100,
  normal: 250
});

type AnimateStageEnum = $Values<typeof AnimateStage>;
const AnimateStage = Object.freeze({
  animate: 'animate',
  static: 'static',
  prep: 'prep'
});

type AnimateProps = {
  height: number | 'auto',
  opacity: number
};

type Props = {|
  animateMount?: boolean,
  children: React.Node,
  speed: AnimateSpeedEnum,
  onAnimateComplete?: () => void,
  type: 'slide' | 'fade',
  show: boolean
|};

type State = {|
  renderChildren: React.Node,
  animateStage: AnimateStageEnum,
  animateProps: AnimateProps,
  componentHeight: number,
  props: Props
|};

export class Animate extends React.Component<Props, State> {
  _mounted: boolean;
  _outerLayerNode: ?(Element | Text);
  _innerLayerNode: ?(Element | Text);

  static defaultProps = {
    speed: 'fast',
    type: 'slide'
  };

  state = {
    animateStage: AnimateStage.static,
    animateProps:
      this.props.show && !this.props.animateMount ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 },
    renderChildren: this.props.children,
    componentHeight: 0,
    props: {
      ...this.props,
      show: this.props.animateMount ? !this.props.show : this.props.show
    }
  };

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.show !== prevState.props.show) {
      if (prevState.animateStage === AnimateStage.static) {
        return {
          animateStage: AnimateStage.prep,
          renderChildren: nextProps.show ? nextProps.children : prevState.props.children,
          props: nextProps
        };
      } else {
        return {
          animateStage: AnimateStage.animate,
          animateProps: nextProps.show ? { height: prevState.componentHeight, opacity: 1 } : { height: 0, opacity: 0 },
          props: nextProps
        };
      }
    } else {
      return {
        props: nextProps,
        renderChildren: nextProps.children
      };
    }
  }

  render() {
    const { animateProps: { height, opacity }, animateStage, renderChildren, props: { show, speed } } = this.state;
    const isStatic = animateStage === AnimateStage.static;
    const isAnimate = animateStage === AnimateStage.animate;

    if (isStatic) {
      return show ? (
        <View>
          <View>{renderChildren}</View>
        </View>
      ) : null;
    } else {
      const outerLayerStyle = [
        isAnimate && styles.transitionStyles,
        isAnimate && { transitionDuration: `${AnimateSpeed[speed]}ms` },
        { height, opacity }
      ];

      return (
        <View onTransitionEnd={this._handleTransitionEnd} ref={this._setOuterLayerNode} style={outerLayerStyle}>
          <View ref={this._setInnerLayerNode}>{renderChildren}</View>
        </View>
      );
    }
  }

  _transitionStart = ({ componentHeight }: Object) => {
    const { props: { show, type } } = this.state;
    const isFade = type === 'fade';
    if (show) {
      this.setState(
        {
          animateProps: { height: isFade ? 'auto' : 0, opacity: 0 },
          animateStage: AnimateStage.animate,
          componentHeight
        },
        this._requestNewFrame(() => {
          this.setState({
            animateProps: { height: isFade ? 'auto' : componentHeight, opacity: 1 }
          });
        })
      );
    } else {
      this.setState(
        {
          animateProps: { height: isFade ? 'auto' : componentHeight, opacity: 1 },
          animateStage: AnimateStage.animate,
          componentHeight
        },
        this._requestNewFrame(() => {
          this.setState({
            animateProps: { height: isFade ? 'auto' : 0, opacity: 0 }
          });
        })
      );
    }
  };

  _handleTransitionEnd = (event: SyntheticTransitionEvent<*>) => {
    const { onAnimateComplete, show } = this.props;
    // Prevent side-effect of capturing parent transition events
    if (event.target === this._outerLayerNode) {
      onAnimateComplete && onAnimateComplete();
      this.setState({
        animateProps: show ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 },
        animateStage: AnimateStage.static
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

  _setOuterLayerNode = (elementRef: ?React.ElementRef<typeof View>) => {
    this._outerLayerNode = ReactDOM.findDOMNode(elementRef);
  };

  _setInnerLayerNode = (elementRef: ?React.ElementRef<typeof View>) => {
    const innerLayerNode = ReactDOM.findDOMNode(elementRef);
    if (innerLayerNode instanceof window.HTMLElement) {
      const height = innerLayerNode.getBoundingClientRect().height;
      this._transitionStart({ componentHeight: height });
    }
  };
}

const styles = StyleSheet.create({
  transitionStyles: {
    transitionProperty: 'opacity, height',
    transitionTimingFunction: 'ease',
    overflow: 'hidden'
  }
});

export default Animate;
