const Spacecraft = require('../');
const DemoComponent = require('./demo-component');

describe('application', () => {
  let spacecraft;
  beforeAll(() => {
    spacecraft = new Spacecraft();
  })

  afterEach(() => {
    // TODO: reset
  })

  test('create application', () => {
    expect(Spacecraft).not.toBeNull();
    expect(spacecraft).not.toBeNull();
  });

  test('mount component', (done) => {
    spacecraft.once('demo-mount', (app) => {
      expect(app).toEqual(spacecraft);
      done()
    });
    spacecraft.mount(DemoComponent);
  });

  test('mount component duplicate', () => {
    spacecraft.mount(DemoComponent);
    spacecraft.mount(DemoComponent);
    expect(spacecraft.getComponentNum()).toBe(1);
  });

  test('load component', (done) => {
    spacecraft.once('demo-load', () => {
      done();
    });
    spacecraft.mount(DemoComponent);
    spacecraft.run();
  });

  test('unmount component', (done) => {
    spacecraft.once('demo-load', () => {
      spacecraft.once('demo-unmount', () => {
        done();
      });
    });
    spacecraft.mount(DemoComponent);
    spacecraft.run();
    spacecraft.unmount();
  });
})
