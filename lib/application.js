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
    if(!!component && component instanceof Component) {
      this.components.push(component);
    }else {
      throw new TypeError('component should extends by `spacecraft/component`');
    }
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
