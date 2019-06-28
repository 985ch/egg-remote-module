# egg-remote-module
![node version][node-image]
[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[node-image]: https://img.shields.io/badge/node-%3E%3D8-blue.svg
[npm-image]: https://img.shields.io/npm/v/egg-remote-module.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-remote-module
[download-image]: https://img.shields.io/npm/dm/egg-remote-module.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-remote-module

这个egg插件提供了加载远程模块的功能，并可以通过redis在不重新启动项目的情况下更新模块

## 开启插件

```js
// config/plugin.js
exports.remoteModule = {
  enable: true,
  package: 'egg-remote-module',
};
```

## 使用场景

- 当你有很多个项目可能需要使用同样的脚本，但是又不希望每次更改这个脚本都要去更新全部项目的时候，就可以使用远程脚本加载。将脚本放到一个http服务器上，然后在修改的时候用redis发送一个通知就可以了。

- 和RPC相比，远程脚本更适合用于实现一些执行效率要求更高，但是对其他脚本依赖不多的功能。

## 使用方法

```js
//config/config.default.js
exports.remoteModule = {
  redis: (app) => { return redis.createClient()}, // 获取一个redis客户端实例
  channel: 'remoteModule', // 远程模块在redis里使用的频道
  modules: {
    test: { url: 'http://localhost/public/test.js' },
  },
}
```
```js
//http://localhost/public/test.js
module.exports = (ctx, params) => {
  return {
    add(a, b){
      return a + b;
    }
  }
}
```
```js
//{app_root}/app/****.js
const test = await ctx.remote('test', params);
console.log(test.add(1, 2));
```
## 和egg-redis一起使用

如果你使用了[egg-redis](https://github.com/eggjs/egg-redis)插件，你可以直接用对应的名称来设置redis
```js
exports.cache9 = {
  redis: 'remote', // 注意：这个redis客户端不能再做普通的存取操作
  channel: 'remoteModule',
  modules: {
    test: { url: 'http://localhost/public/test.js' },
  },
};
```
## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
