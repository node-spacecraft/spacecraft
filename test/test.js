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

  test('demo component', () => {
    let demoComponent = new DemoComponent();
    expect(demoComponent.getInfo()).toEqual({name: 'demo', version: '1.0.0'});
    expect(demoComponent.getComponentName()).toBe('demo');
  });

  test('mount error component', () => {
    expect(() => {
      spacecraft.mount()
    }).toThrowError();
    expect(() => {
      spacecraft.mount({})
    }).toThrowError();
    expect(() => {
      spacecraft.mount(new Function())
    }).toThrowError('component should extends by `spacecraft/component`');
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

  describe('configure settings', () => {
    test('set and get', () => {
      expect(spacecraft.set('testKey', 'testValue')).toEqual(spacecraft);
      expect(spacecraft.set('testKey')).toBe('testValue');
      expect(spacecraft.get('testKey')).toBe('testValue');
      expect(spacecraft.set('testBool', true)).toEqual(spacecraft);
    });

    test('enabled and disabled', () => {
      expect(spacecraft.disabled('testBool')).toBe(false);
      expect(spacecraft.enabled('testBool')).toBe(true);
    })

    test('enable and disable', () => {
      expect(spacecraft.disable('testBool')).toEqual(spacecraft);
      expect(spacecraft.enabled('testBool')).toBe(false);
      expect(spacecraft.enable('testBool')).toEqual(spacecraft);
      expect(spacecraft.enabled('testBool')).toBe(true);
    })
  });
})
