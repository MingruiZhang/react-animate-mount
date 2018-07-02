// @flow
import * as React from 'react';
import Animate from '../src/Animate';
import { mount } from 'enzyme';

const TestChildren = <div testid={'children'} />;
const onCompleteFn = jest.fn();
const outerLayerNode = 'outerLayerNode';

const validateStaticMounted = component => {
  expect(component.state('animateStage')).toBe('static');
  expect(onCompleteFn).toBeCalled();
  expect(component.find({ testid: 'children' })).toHaveLength(1);
};

const validateStaticUnmounted = component => {
  expect(component.state('animateStage')).toBe('static');
  expect(onCompleteFn).toBeCalled();
  component.update();
  expect(component.find({ testid: 'children' })).toHaveLength(0);
};

describe('Animate', () => {
  jest.useFakeTimers();
  window.requestAnimationFrame = cb => {
    setTimeout(cb, 0);
  };

  describe('initial render', () => {
    test('be null when show=false', () => {
      const component = new Animate({ show: false, children: TestChildren, duration: 200, type: 'slide' });
      expect(component.render()).toBeNull();
    });

    test('be children 2 wrapped View when show=true', () => {
      const component = new Animate({ show: true, children: TestChildren, duration: 200, type: 'slide' });
      expect(component.render()).toEqual(
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>{TestChildren}</div>
        </div>
      );
    });
  });

  describe('mounting transition', () => {
    let component;
    let transitionEndCallback;

    beforeEach(() => {
      component = mount(
        <Animate onAnimateComplete={onCompleteFn} show={false}>
          {TestChildren}
        </Animate>
      );
      component.instance()._setInnerLayerNode = jest.fn();
      expect(component.find({ testid: 'children' })).toHaveLength(0);
      expect(component.state('animateStage')).toBe('static');
      component.setProps({ show: true });
      // animateStage change to 'prep'
      expect(component.state('animateStage')).toBe('prep');
      expect(component.find({ testid: 'children' })).toHaveLength(1);
      const outerLayer = component.children();
      transitionEndCallback = outerLayer.prop('onTransitionEnd');
      // animateStage change to 'animate'
      component.instance()._transitionStart({ componentHeight: 300 });
      expect(component.state('animateStage')).toBe('animate');
      expect(component.state('animateProps')).toEqual({ height: 0, opacity: 0 });
      jest.advanceTimersByTime(5);
      expect(component.state('animateProps')).toEqual({ height: 300, opacity: 1 });
      component.instance()._outerLayerNode = outerLayerNode;
    });

    test('basic prep -> animate -> static flow', () => {
      // css transition ends
      transitionEndCallback({ target: outerLayerNode });

      validateStaticMounted(component);
    });

    test('intecepted by un-mount during animate', () => {
      // new prop came in before transition finishes
      component.setProps({ show: false });
      // animateStage change to 'animate' but different firection
      expect(component.state('animateStage')).toBe('animate');
      expect(component.state('animateProps')).toEqual({ height: 0, opacity: 0 });
      transitionEndCallback({ target: outerLayerNode });

      validateStaticUnmounted(component);
    });
  });

  describe('un-mounting transition', () => {
    let component;
    let transitionEndCallback;

    beforeEach(() => {
      component = mount(
        <Animate onAnimateComplete={onCompleteFn} show>
          {TestChildren}
        </Animate>
      );
      component.instance()._setInnerLayerNode = jest.fn();
      expect(component.find({ testid: 'children' })).toHaveLength(1);
      expect(component.state('animateStage')).toBe('static');
      component.setProps({ show: false });
      // animateStage change to 'prep'
      expect(component.state('animateStage')).toBe('prep');
      expect(component.find({ testid: 'children' })).toHaveLength(1);
      const outerLayer = component.children();
      transitionEndCallback = outerLayer.prop('onTransitionEnd');
      component.instance()._transitionStart({ componentHeight: 300 });
      // animateStage change to 'animate'
      expect(component.state('animateStage')).toBe('animate');
      expect(component.state('animateProps')).toEqual({ height: 300, opacity: 1 });
      jest.advanceTimersByTime(5);
      expect(component.state('animateProps')).toEqual({ height: 0, opacity: 0 });
      component.instance()._outerLayerNode = outerLayerNode;
    });

    test('basic prep -> animate -> static flow', () => {
      // css transition ends
      transitionEndCallback({ target: outerLayerNode });

      validateStaticUnmounted(component);
    });

    test('intecepted by mount during animate', () => {
      // new prop came in before transition finishes
      component.setProps({ show: true });
      // animateStage change to 'animate' but different firection
      expect(component.state('animateStage')).toBe('animate');
      expect(component.state('animateProps')).toEqual({ height: 300, opacity: 1 });
      transitionEndCallback({ target: outerLayerNode });

      validateStaticMounted(component);
    });
  });
});
