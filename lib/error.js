'use strict';

class RemoteModuleError extends Error {
  constructor(message, data) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    if (data) this.data = data;
  }
}

module.exports = RemoteModuleError;
