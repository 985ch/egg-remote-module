'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const test = await this.ctx.remote('test');
    console.log(test.test(1, 3));
    const test2 = await this.ctx.remote('test');
    console.log(test2.test(3, 5));
    this.ctx.body = 'hi, ' + this.app.plugins.remoteModule.name;
  }
}

module.exports = HomeController;
