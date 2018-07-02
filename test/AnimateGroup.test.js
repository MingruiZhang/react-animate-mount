// @flow
// eslint-env jest
import * as React from 'react';
import AnimateGroup from '../src/AnimateGroup';
import { mount } from 'enzyme';
import mergeDiff, { Status } from '../src/utils/mergeDiff';

const textArrayInit = [
  <div key={'item-1'}>Text 1</div>,
  <div key={'item-2'}>Text 2</div>,
  <div key={'item-3'}>Text 3</div>,
  <div key={'item-4'}>Text 4</div>,
  <div key={'item-5'}>Text 5</div>
];

describe('AnimateGroup', () => {
  describe('mergeDiff', () => {
    test('merge correctly when adding new item in middle', () => {
      // Added 'Text 6' betweet 3 and 4
      const textArrayNew = [
        <div key={'item-1'}>Text 1</div>,
        <div key={'item-2'}>Text 2</div>,
        <div key={'item-3'}>Text 3</div>,
        <div key={'item-6'}>Text 6</div>,
        <div key={'item-4'}>Text 4</div>,
        <div key={'item-5'}>Text 5</div>
      ];

      expect(mergeDiff(textArrayInit, textArrayNew)).toEqual([
        { child: <div key={'item-1'}>Text 1</div>, status: Status.static },
        { child: <div key={'item-2'}>Text 2</div>, status: Status.static },
        { child: <div key={'item-3'}>Text 3</div>, status: Status.static },
        { child: <div key={'item-6'}>Text 6</div>, status: Status.in },
        { child: <div key={'item-4'}>Text 4</div>, status: Status.static },
        { child: <div key={'item-5'}>Text 5</div>, status: Status.static }
      ]);
    });

    test('merge correctly when adding new item at end', () => {
      // Added 'Text 6' after 5
      const textArrayNew = [
        <div key={'item-1'}>Text 1</div>,
        <div key={'item-2'}>Text 2</div>,
        <div key={'item-3'}>Text 3</div>,
        <div key={'item-4'}>Text 4</div>,
        <div key={'item-5'}>Text 5</div>,
        <div key={'item-6'}>Text 6</div>
      ];

      expect(mergeDiff(textArrayInit, textArrayNew)).toEqual([
        { child: <div key={'item-1'}>Text 1</div>, status: Status.static },
        { child: <div key={'item-2'}>Text 2</div>, status: Status.static },
        { child: <div key={'item-3'}>Text 3</div>, status: Status.static },
        { child: <div key={'item-4'}>Text 4</div>, status: Status.static },
        { child: <div key={'item-5'}>Text 5</div>, status: Status.static },
        { child: <div key={'item-6'}>Text 6</div>, status: Status.in }
      ]);
    });

    test('merge correctly when removing item in middle', () => {
      // Removed 'Text 2'
      const textArrayNew = [
        <div key={'item-1'}>Text 1</div>,
        <div key={'item-3'}>Text 3</div>,
        <div key={'item-4'}>Text 4</div>,
        <div key={'item-5'}>Text 5</div>
      ];

      expect(mergeDiff(textArrayInit, textArrayNew)).toEqual([
        { child: <div key={'item-1'}>Text 1</div>, status: Status.static },
        { child: <div key={'item-2'}>Text 2</div>, status: Status.out },
        { child: <div key={'item-3'}>Text 3</div>, status: Status.static },
        { child: <div key={'item-4'}>Text 4</div>, status: Status.static },
        { child: <div key={'item-5'}>Text 5</div>, status: Status.static }
      ]);
    });

    test('merge correctly when removing item at end', () => {
      // Removed 'Text 5'
      const textArrayNew = [
        <div key={'item-1'}>Text 1</div>,
        <div key={'item-2'}>Text 2</div>,
        <div key={'item-3'}>Text 3</div>,
        <div key={'item-4'}>Text 4</div>
      ];

      expect(mergeDiff(textArrayInit, textArrayNew)).toEqual([
        { child: <div key={'item-1'}>Text 1</div>, status: Status.static },
        { child: <div key={'item-2'}>Text 2</div>, status: Status.static },
        { child: <div key={'item-3'}>Text 3</div>, status: Status.static },
        { child: <div key={'item-4'}>Text 4</div>, status: Status.static },
        { child: <div key={'item-5'}>Text 5</div>, status: Status.out }
      ]);
    });

    test('merge correctly when both adding and removing item', () => {
      // Removed 2 and 4 ,Added 6 and 7
      const textArrayNew = [
        <div key={'item-1'}>Text 1</div>,
        <div key={'item-7'}>Text 7</div>,
        <div key={'item-3'}>Text 3</div>,
        <div key={'item-5'}>Text 5</div>,
        <div key={'item-6'}>Text 6</div>
      ];

      expect(mergeDiff(textArrayInit, textArrayNew)).toEqual([
        { child: <div key={'item-1'}>Text 1</div>, status: Status.static },
        { child: <div key={'item-2'}>Text 2</div>, status: Status.out },
        { child: <div key={'item-7'}>Text 7</div>, status: Status.in },
        { child: <div key={'item-3'}>Text 3</div>, status: Status.static },
        { child: <div key={'item-4'}>Text 4</div>, status: Status.out },
        { child: <div key={'item-5'}>Text 5</div>, status: Status.static },
        { child: <div key={'item-6'}>Text 6</div>, status: Status.in }
      ]);
    });
  });

  test('onAnimateComplete gets triggered only when all animate finishesComplete', () => {
    const onCompleteStub = jest.fn();
    const component = mount(<AnimateGroup onAnimateComplete={onCompleteStub}>{textArrayInit}</AnimateGroup>);
    const textArrayNew = [
      <div key={'item-1'}>Text 1</div>,
      <div key={'item-7'}>Text 7</div>,
      <div key={'item-3'}>Text 3</div>,
      <div key={'item-5'}>Text 5</div>,
      <div key={'item-6'}>Text 6</div>
    ];
    component.setProps({ children: textArrayNew });
    expect(component.state('isAnimating')).toEqual(true);
    component.instance()._handleEachAnimateComplete();
    expect(component.state('isAnimating')).toEqual(false);
    expect(onCompleteStub).toBeCalled();
  });
});
