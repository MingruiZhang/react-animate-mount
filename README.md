# React-Animate-Mount

[![npm version](https://img.shields.io/npm/v/react-animate-mount.svg)](https://www.npmjs.com/package/react-animate-mount)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/mingruizhang/react-animate-mount/blob/master/LICENSE)

React-Animate-Mount provides lightweight and simple wrapper for sliding (to auto height) and Fading animation when component mounts and unmount:
* [**Animate**](https://github.com/MingruiZhang/react-animate-mount#animate) provides animation for single component when mount & umount
* [**AnimateGroup**](https://github.com/MingruiZhang/react-animate-mount#animategroup) provides animation for items entering & leaving a groups of items

See ... for examples

### Install

```bash
$ yarn add react-animate-mount
```

## Animate

Help animate single component when mount & umount

#### Usage

```
/** Before **/
this.state.show ? {childen} : null;

/** After **/
<Animate show={this.state.show}>
  {childen}
</Animate>
```

#### Props

| Name                                               | Type     | Description                     |
| :------------------------------------------------- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show        | boolean    | The key boolean that indicate if the children should be mounted    |
| animateOnInit | ?boolean = false | Normally component is not animated when `<Animate>` mounts. With this flag the child component will animate in on initialization.   |
| duration       | ?number = 200 | The duration you want the animate to last in ms, default to 250 |
| type       | ?string('slide' or 'fade') = 'slide' | Specify animation effect, sliding or pure fading |
| onAnimateComplete       | ?function | Invokes when component animation finishes. |


## AnimateGroup

`<AnimateGroup>` wraps around a list of item, provides `<Animate>` effect to each individual child. As item changes in the list, `<AnimateGroup>` will animate out removed children and animate in new children correctly.

**Note:** Please provide unique key to each child. keys are used to identify child between renders

#### Usage

```
<AnimateGroup>
  {items.map(item => (<Item key={item.key} data={item.data} />)}
</AnimateGroup>
```

#### Props

| Name                                               | Type     | Description                     |
| :------------------------------------------------- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| duration       | ?number = 200 | The duration you want the animate to last in ms, default to 250 |
| type       | ?string('slide' or 'fade') = 'slide' | Specify animation effect, sliding or pure fading |
| onAnimateComplete       | ?function | Invokes when component animation finishes. |



