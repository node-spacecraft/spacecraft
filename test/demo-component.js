const Component = require('../').component;

class DemoComponent extends Component {
  getInfo() {
    return {
      name: 'demo',
      version: '1.0.0',
    }
  }

  onMount() {
    this.app.emit('demo-mount', this.app);
  }

  onLoad() {
    this.app.emit('demo-load');
  }

  onUnmount() {
    this.app.emit('demo-unmount');
  }
}

module.exports = DemoComponent;
