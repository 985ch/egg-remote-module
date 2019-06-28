'use strict';

module.exports = {
  async remote(name, params) {
    return await this.app.remoteModule(this, name, params);
  },
};
