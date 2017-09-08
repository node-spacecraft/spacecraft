module.exports = class Component {
  constructor() {
    this.app = null;
  }

  getInfo () {
    return {
      name: 'component',
      version: '0.0.1'
    }
  }

  getComponentName() {
    return this.getInfo().name || '';
  }

  onMount() {}

  onLoad() {}

  onUnmount() {}

  onReset() {}
}
