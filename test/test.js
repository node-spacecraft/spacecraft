const Spacecraft = require('../');
const Component = require('../component');
const DemoComponent = require('./demo-component');

describe('application', () => {
  let spacecraft;
  beforeAll(() => {
    spacecraft = new Spacecraft();
  })

  afterEach(() => {
    spacecraft.unmount();
  })

  test('create application', () => {
    expect(Spacecraft).not.toBeNull();
    expect(spacecraft).not.toBeNull();
  });

  test('base component', () => {
    let baseComponent = new Component();
    expect(baseComponent.getComponentName()).toBe('component');
  });

  test('demo component', () => {
    let demoComponent = new DemoComponent();
    let demoComponent2 = new DemoComponent('demo2');
    expect(demoComponent.getInfo()).toEqual({name: 'demo', version: '1.0.0'});
    expect(demoComponent2.getInfo()).toEqual({name: 'demo2', version: '1.0.0'});
    expect(demoComponent.getComponentName()).toBe('demo');
  });

  describe('mount', () => {
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
      spacecraft.mount(new DemoComponent());
    });

    test('mount component duplicate', () => {
      spacecraft.mount(new DemoComponent());
      spacecraft.mount(new DemoComponent());
      expect(spacecraft.getComponentNum()).toBe(1);
    });

    test('mount component more', () => {
      spacecraft.mount(new DemoComponent());
      spacecraft.mount(new DemoComponent());
      spacecraft.mount(new DemoComponent('demo2'));
      expect(spacecraft.getComponentNum()).toBe(2);
    });
  })

  test('load component', (done) => {
    spacecraft.once('demo-load', () => {
      done();
    });
    spacecraft.mount(new DemoComponent());
    spacecraft.run();
  });

  describe('unmount', () => {
    test('unmount all component', (done) => {
      spacecraft.once('demo-load', () => {
        spacecraft.once('demo-unmount', () => {
          done();
        });
      });
      spacecraft.mount(new DemoComponent());
      spacecraft.run();
      spacecraft.unmount();
      expect(spacecraft.getComponentNum()).toBe(0);
    });

    test('unmount spec component', (done) => {
      spacecraft.once('demo-load', () => {
        spacecraft.once('demo-unmount', () => {
          done();
        });
      });
      let dc = new DemoComponent();
      spacecraft.mount(dc);
      spacecraft.run();
      spacecraft.unmount(dc);
      expect(spacecraft.getComponentNum()).toBe(0);
    });
  })

  describe('reset', () => {
    test('reset all component', (done) => {
      spacecraft.once('demo-load', () => {
        spacecraft.once('demo-reset', () => {
          done();
        });
      });
      spacecraft.mount(new DemoComponent());
      spacecraft.run();
      spacecraft.reset();
    });

    test('reset spec component', (done) => {
      spacecraft.once('demo-load', () => {
        spacecraft.once('demo-reset', () => {
          done();
        });
      });
      let dc = new DemoComponent();
      spacecraft.mount(dc);
      spacecraft.run();
      spacecraft.reset(dc);
    });
  })

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
