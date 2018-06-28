# React-Animate-Mount

[![npm version](https://img.shields.io/npm/v/react-animate-mount.svg)](https://www.npmjs.com/package/react-animate-mount)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/mingruizhang/react-animate-mount/blob/master/LICENSE)

React-Animate-Mount provides lightweight and simple wrapper for sliding (to auto height) and Fading animation when component mounts and unmount:
* **Animate** provides animation for single component when mount & umount
* **AnimateGroup** provides animation for items entering & leaving a groups of items

See ... for examples

### Install

```bash
$ yarn add react-animate-mount
```

## Animate

### Usage

```
/** Before **/
show ? {childen} : null;

/** After **/
<Animate show={show}>
  {childen}
</Animate>
```

### Props

| Name                                               | Type     | Default  | Description                                                                                                                                                                              |
| :------------------------------------------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show        | boolean    |          | The key boolean that indicate if the children should be mounted    |
| keyAccessor | function |          | Function that returns a string key given a data object and its index. Used to track which nodes are entering, updating and leaving.                                                      |
| start       | function |          | A function that returns the starting state. The function is passed the data and index and must return an object.                                                                         |


