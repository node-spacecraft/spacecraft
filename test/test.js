const spacecraft = require('../');
const DemoComponent = require('./demo-component');

describe('application', () => {
  let spacecraft = null;
  beforeAll(() => {
    spacecraft = spacecraft();
  });

  test('create application', () => {
    expect(spacecraft).not.toBeNull();
    expect(spacecraft()).not.toBeNull();
  });

  test('mount component', () => {
    expect(spacecraft.mount(DemoComponent));
  })
})
