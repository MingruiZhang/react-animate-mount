// // @flow
// // eslint-env jest
// import * as React from 'react';
// import AnimateGroup from '../src/AnimateGroup';
// import { mount } from 'enzyme';
// import { Text } from 'react-native';
// import mergeDiff, { Status } from '../src/utils/mergeDiff';

// const textArrayInit = [
//   <Text key={'item-1'}>Text 1</Text>,
//   <Text key={'item-2'}>Text 2</Text>,
//   <Text key={'item-3'}>Text 3</Text>,
//   <Text key={'item-4'}>Text 4</Text>,
//   <Text key={'item-5'}>Text 5</Text>
// ];

// describe('AnimateGroup', () => {
//   describe('mergeDiff', () => {
//     test('merge correctly when adding new item in middle', () => {
//       // Added 'Text 6' betweet 3 and 4
//       const textArrayNew = [
//         <Text key={'item-1'}>Text 1</Text>,
//         <Text key={'item-2'}>Text 2</Text>,
//         <Text key={'item-3'}>Text 3</Text>,
//         <Text key={'item-6'}>Text 6</Text>,
//         <Text key={'item-4'}>Text 4</Text>,
//         <Text key={'item-5'}>Text 5</Text>
//       ];

//       expect(mergeDiff(textArrayInit, textArrayNew)).toEqual([
//         { child: <Text key={'item-1'}>Text 1</Text>, status: Status.static },
//         { child: <Text key={'item-2'}>Text 2</Text>, status: Status.static },
//         { child: <Text key={'item-3'}>Text 3</Text>, status: Status.static },
//         { child: <Text key={'item-6'}>Text 6</Text>, status: Status.in },
//         { child: <Text key={'item-4'}>Text 4</Text>, status: Status.static },
//         { child: <Text key={'item-5'}>Text 5</Text>, status: Status.static }
//       ]);
//     });

//     test('merge correctly when adding new item at end', () => {
//       // Added 'Text 6' after 5
//       const textArrayNew = [
//         <Text key={'item-1'}>Text 1</Text>,
//         <Text key={'item-2'}>Text 2</Text>,
//         <Text key={'item-3'}>Text 3</Text>,
//         <Text key={'item-4'}>Text 4</Text>,
//         <Text key={'item-5'}>Text 5</Text>,
//         <Text key={'item-6'}>Text 6</Text>
//       ];

//       expect(mergeDiff(textArrayInit, textArrayNew)).toEqual([
//         { child: <Text key={'item-1'}>Text 1</Text>, status: Status.static },
//         { child: <Text key={'item-2'}>Text 2</Text>, status: Status.static },
//         { child: <Text key={'item-3'}>Text 3</Text>, status: Status.static },
//         { child: <Text key={'item-4'}>Text 4</Text>, status: Status.static },
//         { child: <Text key={'item-5'}>Text 5</Text>, status: Status.static },
//         { child: <Text key={'item-6'}>Text 6</Text>, status: Status.in }
//       ]);
//     });

//     test('merge correctly when removing item in middle', () => {
//       // Removed 'Text 2'
//       const textArrayNew = [
//         <Text key={'item-1'}>Text 1</Text>,
//         <Text key={'item-3'}>Text 3</Text>,
//         <Text key={'item-4'}>Text 4</Text>,
//         <Text key={'item-5'}>Text 5</Text>
//       ];

//       expect(mergeDiff(textArrayInit, textArrayNew)).toEqual([
//         { child: <Text key={'item-1'}>Text 1</Text>, status: Status.static },
//         { child: <Text key={'item-2'}>Text 2</Text>, status: Status.out },
//         { child: <Text key={'item-3'}>Text 3</Text>, status: Status.static },
//         { child: <Text key={'item-4'}>Text 4</Text>, status: Status.static },
//         { child: <Text key={'item-5'}>Text 5</Text>, status: Status.static }
//       ]);
//     });

//     test('merge correctly when removing item at end', () => {
//       // Removed 'Text 5'
//       const textArrayNew = [
//         <Text key={'item-1'}>Text 1</Text>,
//         <Text key={'item-2'}>Text 2</Text>,
//         <Text key={'item-3'}>Text 3</Text>,
//         <Text key={'item-4'}>Text 4</Text>
//       ];

//       expect(mergeDiff(textArrayInit, textArrayNew)).toEqual([
//         { child: <Text key={'item-1'}>Text 1</Text>, status: Status.static },
//         { child: <Text key={'item-2'}>Text 2</Text>, status: Status.static },
//         { child: <Text key={'item-3'}>Text 3</Text>, status: Status.static },
//         { child: <Text key={'item-4'}>Text 4</Text>, status: Status.static },
//         { child: <Text key={'item-5'}>Text 5</Text>, status: Status.out }
//       ]);
//     });

//     test('merge correctly when both adding and removing item', () => {
//       // Removed 2 and 4 ,Added 6 and 7
//       const textArrayNew = [
//         <Text key={'item-1'}>Text 1</Text>,
//         <Text key={'item-7'}>Text 7</Text>,
//         <Text key={'item-3'}>Text 3</Text>,
//         <Text key={'item-5'}>Text 5</Text>,
//         <Text key={'item-6'}>Text 6</Text>
//       ];

//       expect(mergeDiff(textArrayInit, textArrayNew)).toEqual([
//         { child: <Text key={'item-1'}>Text 1</Text>, status: Status.static },
//         { child: <Text key={'item-2'}>Text 2</Text>, status: Status.out },
//         { child: <Text key={'item-7'}>Text 7</Text>, status: Status.in },
//         { child: <Text key={'item-3'}>Text 3</Text>, status: Status.static },
//         { child: <Text key={'item-4'}>Text 4</Text>, status: Status.out },
//         { child: <Text key={'item-5'}>Text 5</Text>, status: Status.static },
//         { child: <Text key={'item-6'}>Text 6</Text>, status: Status.in }
//       ]);
//     });
//   });

//   test('onAnimateComplete gets triggered only when all animate finishesComplete', () => {
//     const onCompleteStub = jest.fn();
//     const component = mount(<AnimateGroup onAnimateComplete={onCompleteStub}>{textArrayInit}</AnimateGroup>);
//     const textArrayNew = [
//       <Text key={'item-1'}>Text 1</Text>,
//       <Text key={'item-7'}>Text 7</Text>,
//       <Text key={'item-3'}>Text 3</Text>,
//       <Text key={'item-5'}>Text 5</Text>,
//       <Text key={'item-6'}>Text 6</Text>
//     ];
//     component.setProps({ children: textArrayNew });
//     expect(component.state('animateCounter')).toEqual(4);
//     component.instance()._handleEachAnimateComplete();
//     expect(component.state('animateCounter')).toEqual(3);
//     expect(onCompleteStub).not.toBeCalled();
//     component.instance()._handleEachAnimateComplete();
//     expect(component.state('animateCounter')).toEqual(2);
//     expect(onCompleteStub).not.toBeCalled();
//     component.instance()._handleEachAnimateComplete();
//     expect(component.state('animateCounter')).toEqual(1);
//     expect(onCompleteStub).not.toBeCalled();
//     component.instance()._handleEachAnimateComplete();
//     expect(component.state('animateCounter')).toEqual(0);
//     expect(onCompleteStub).toBeCalled();
//   });
// });
