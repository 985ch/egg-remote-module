'use strict';

const mock = require('egg-mock');

describe('test/remote-module.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/remote-module-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, remoteModule')
      .expect(200);
  });
});
