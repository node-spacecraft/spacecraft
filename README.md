# spacecraft

[![Build Status](https://travis-ci.org/node-spacecraft/spacecraft.svg?branch=master)](https://travis-ci.org/node-spacecraft/spacecraft)
[![Coverage Status](https://coveralls.io/repos/github/node-spacecraft/spacecraft/badge.svg?branch=master)](https://coveralls.io/github/node-spacecraft/spacecraft?branch=master)
[![npm](https://img.shields.io/npm/l/spacecraft.svg)](https://www.npmjs.com/package/spacecraft)

A light framework core for everyone can mount more component or write component, to create a node app which have not more redundant file and function.Using es6/es7

### Usage

Install
```bash
$ npm install --save spacecraft
```

create a component
```javascript
const Component = require('spacecraft/component');

class DemoComponent extends Component {
  getInfo() {
    return {
      name: 'demo',
      version: '1.0.0',
    }
  }

  onMount() {

  }

  onLoad() {

  }

  onUnmount() {

  }
}

module.exports = DemoComponent;
```

In a component, we have 3 function when component is **mount**, app is **start** and component is **unmount**, all of this is optional.

For every component, have a function `getInfo` must to be override, via the return object to division other component. Same name component will not mount twice.
