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

  onMount() {
    if(this.app) {
      let name = this.getComponentName();
      this.app[name] = this;
    }
  }

  onLoad() {}

  onUnmount() {}

  onReset() {}
}
