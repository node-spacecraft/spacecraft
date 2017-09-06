const debug = require('debug')('spacecraft:application');
const Emitter = require('events');
const Component = require('./component');

module.exports = class Application extends Emitter {
  constructor() {
    super();
    this.components = [];
    this.settings = {};
  }

  mount(component) {
    if(!component) {
      throw new Error('require component as param');
    }
    if(typeof component !== 'function') {
      throw new TypeError(`component must be a class not ${typeof component}`);
    }
    let _component = new component();
    if(!(_component instanceof Component)) {
      throw new TypeError('component should extends by `spacecraft/component`');
    }

    if(this.isComponentExist(_component)) {
      debug('component should not mount duplicate');
    }else {
      debug('mount component %o', _component.getInfo());
      this.components.push(_component);
      _component.app = this;
      _component.onMount();
    }
  }

  run() {
    for (let _component of this.components) {
      _component.onLoad();
    }
  }

  unmount() {
    for (let _component of this.components) {
      _component.onUnmount();
    }
  }

  getComponentNum() {
    return this.components.length;
  }

  isComponentExist(_component) {
    for (let component of this.components) {
      if(_component.getComponentName() === component.getComponentName()) {
        return true;
      }
    }
    return false;
  }

  set(setting, val) {
    if(arguments.length === 1) {
      return this.settings[setting];
    }

    debug('set "%s" to %o', setting, val);
    this.settings[setting] = val;
    return this;
  }

  get(setting) {
    return this.settings[settings] || '';
  }

  enabled(setting) {
    return Boolean(this.get(setting));
  }

  disabled(setting) {
    return !this.get(setting);
  }

  enable(setting) {
    this.set(setting, true);
    return this;
  }

  disable(setting) {
    this.set(setting, false);
    return this;
  }
}
