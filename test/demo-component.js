const Component = require('../component');

class DemoComponent extends Component {
  constructor(componentName = 'demo') {
    super();
    this.componentName = componentName;
  }

  getInfo() {
    return {
      name: this.componentName,
      version: '1.0.0',
    }
  }

  onMount() {
    super.onMount();
    this.app.emit('demo-mount', this.app);
  }

  onLoad() {
    this.app.emit('demo-load');
  }

  onUnmount() {
    this.app.emit('demo-unmount');
  }

  onReset() {
    this.app.emit('demo-reset');
  }
}

module.exports = DemoComponent;
