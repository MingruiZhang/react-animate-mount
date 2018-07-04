import React from 'react';
import ReactDOM from 'react-dom';
import AnimateGroup from '../../src/AnimateGroup'

let nameInc = 7;

const colorPalette = [
  'rgba(255, 202, 177, 0.4)',
  'rgba(105, 162, 176, 0.4)',
  'rgba(101, 145, 87, 0.4)',
  'rgba(161, 192, 132, 0.4)',
  'rgba(224, 82, 99, 0.4)',
  'rgba(31, 39, 27, 0.4)',
  'rgba(25, 100, 126, 0.4)',
  'rgba(40, 175, 176, 0.4)',
  'rgba(244, 211, 94, 0.4)',
  'rgba(238, 150, 75, 0.4)'
];

const randomMode = ['AddRemove'];

const itemStyle = {
	display: 'flex',
	flexDirection: 'column',
  marginTop: 10,
  marginBottom: 10,
  padding: 5,
	alignItems: 'center',
  borderRadius: 10
};

const textStyle = {
  fontSize: 16,
  fontWeight: 'bold'
};

class ExampleAnimateGroup extends React.PureComponent {
  state = {
    items: [
      {
        name: 1,
        bgc: colorPalette[0]
      },
      {
        name: 2,
        bgc: colorPalette[1]
      },
      {
        name: 3,
        bgc: colorPalette[2]
      },
      {
        name: 4,
        bgc: colorPalette[3]
      },
      {
        name: 5,
        bgc: colorPalette[4]
      }
    ]
  };

  _handleRandomAction = () => {
    const { items } = this.state;
    const mode = randomMode[this._getRandomInt(3)];
    if (items.length < 3) {
      this._randomAdd();
    } else if (items.length > 6) {
      this._randomRemove();
    } else if (mode === 'Add') {
      this._randomAdd();
    } else if (mode === 'Remove') {
      this._randomRemove();
    } else {
      this._randomAddRemove();
    }
  };

  _randomAdd = () => {
    const { items } = this.state;
    const randomPosition = this._getRandomInt(items.length);
    this.setState({
      items: [...items.slice(0, randomPosition), this._generateNewItem(), ...items.slice(randomPosition)]
    });
  };

  _randomRemove = () => {
    const { items } = this.state;
    const randomPosition = this._getRandomInt(items.length);
    this.setState({
      items: [...items.slice(0, randomPosition), ...items.slice(randomPosition + 1)]
    });
  };

  _randomAddRemove = () => {
    const { items } = this.state;
    const randomRemovePosition = this._getRandomInt(items.length);
    const itemsTemp = [...items.slice(0, randomRemovePosition), ...items.slice(randomRemovePosition + 1)];
    const randomAddPosition = this._getRandomInt(itemsTemp.length);
    this.setState({
      items: [...itemsTemp.slice(0, randomAddPosition), this._generateNewItem(), ...itemsTemp.slice(randomAddPosition)]
    });
  };

  _getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  _generateNewItem = () => ({
    name: nameInc++,
    bgc: colorPalette[nameInc % 10]
  });

  render() {
    const { items } = this.state;
    return (
      <div className="example-root">
        <div onClick={this._handleRandomAction} className="example-toggle">
          Add/Remove item
        </div>
        <AnimateGroup>
          {items.map(item => (
            <div key={item.name} style={{...itemStyle, backgroundColor: item.bgc }}>
              <p style={textStyle}>{item.name}</p>
            </div>
          ))}
        </AnimateGroup>
      </div>
    );
  }
}

export default ExampleAnimateGroup;
