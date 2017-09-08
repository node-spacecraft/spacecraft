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
    if(!(component instanceof Component)) {
      throw new TypeError('component should extends by `spacecraft/component`');
    }

    if(this.isComponentExist(component)) {
      debug('component should not mount duplicate');
    }else {
      debug('mount component %o', component.getInfo());
      this.components.push(component);
      component.app = this;
      component.onMount();
    }

    return this;
  }

  run() {
    for (let _component of this.components) {
      _component.onLoad();
    }
  }

  unmount(component) {
    if(!!component) {
      component.onUnmount();
      let index = this.components.indexOf(component);
      if(index >= 0) {
        this.components.splice(index, 1);
      }
    }else {
      // unmount all
      for (let _component of this.components) {
        _component.onUnmount();
      }
      this.components = [];
    }
  }

  reset(component) {
    if(!!component) {
      component.onReset();
    }else {
      // reset all
      for (let _component of this.components) {
        _component.onReset();
      }
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
    return this.settings[setting] || '';
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
