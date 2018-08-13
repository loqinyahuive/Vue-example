# Webpack4之下的版本:
### 参考https://segmentfault.com/a/1190000011853167
## yarn add typescript ts-loader
## Webpack配置 ./build/webpack.base.conf.js
### a. entry入口文件main.js改为main.ts
```
entry: {
  app: './src/main.ts'
}
```
### b. resolve.extensions添加.ts
```
resolve: {
  extensions: ['.js', '.ts', '.vue', '.json']
}
```
### c. module.rules添加.ts解析规则
```
module: {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    }
  ]
}
```
## 增加tsconfig.json
```
// tsconfig.json
{
  "compilerOptions": {
    // 与 Vue 的浏览器支持保持一致
    "target": "es5",
    // 这可以对 `this` 上的数据属性进行更严格的推断
    "strict": true,
    // 如果使用 webpack 2+ 或 rollup，可以利用 tree-shake:
    "module": "es2015",
    "moduleResolution": "node"
  }
}
```
## 增加 vue-shim.d.ts
```
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```
## .js 文件重命名为 .ts 文件
### Typescript默认只识别*.ts文件，不识别*.vue文件
### before
```
import App from './App'
import HelloWorld from '@/components/HelloWorld'
```
### after
```
import App from './App.vue'
import HelloWorld from '@/components/HelloWorld.vue'
```
# webpack4 填坑之路:
### 请参考 https://blog.csdn.net/w1170375057/article/details/80831801
### yarn add typescript ts-loader

### 修改开发环境webpack.dev.conf.js
###### 增加设置mode为development，删除DefinePluginplugin中的环境变量设置，如果只用来设置环境变量，可以删除插件；
注释webpack.NamedModulesPlugin、webpack.NoEmitOnErrorsPlugin
```
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  // ....
  plugins: {
      // new webpack.NamedModulesPlugin(),
      // new webpack.NoEmitOnErrorsPlugin(),
  }
```
### 修改生产环境webpack.prod.conf.js
###### 增加设置mode为production，optimization配置；删除DefinePluginplugin中的环境变量设置，如果只用来设置环境变量，可以删除插件；
注释webpack.optimize.CommonsChunkPlugin、uglifyjs-webpack-plugin、webpack.optimize.ModuleConcatenationPlugin；
如果npm run build时报错Error: Path variable [contenthash] not implemented in this context: static/css/[name].[contenthash].css，将contenthash换成hash即可

### 修改webpack.base.conf.js
```
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const vueLoaderPlugin = require('vue-loader/lib/plugin') // 增加此行

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }
    ]
  },
  plugins: [new vueLoaderPlugin()], // 增加此行
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

```


### 错误1: webpack 版本需要升级
```
Module build failed: Error: You may be using an old version of webpack; please check you're using at least version 4
    at successfulTypeScriptInstance (/Users/ni/wt-hermes/example/20180731/vue-demo/node_modules/ts-loader/dist/instances.js:168:15)
    at Object.getTypeScriptInstance (/Users/ni/wt-hermes/example/20180731/vue-demo/node_modules/ts-loader/dist/instances.js:51:12)
    at Object.loader (/Users/ni/wt-hermes/example/20180731/vue-demo/node_modules/ts-loader/dist/index.js:16:41)

 @ multi (webpack)-dev-server/client?http://localhost:8080 webpack/hot/dev-server ./src/main.ts
```
### 解决1  
```
yarn add webpack
```
### 错误2: webpack与webpack-dev-server版本不兼容 缺少webpack-cli
```
Error: Cannot find module 'webpack/bin/config-yargs'
    at Function.Module._resolveFilename (module.js:536:15)
    at Function.Module._load (module.js:466:25)
```
### 解决2
```
 yarn add webpack-dev-server
 yarn add webpack-cli -D
```
### 错误3: 需要升级html-webpack-plugin
```
10% building modules 1/1 modules 0 active(node:28710) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
(node:28710) DeprecationWarning: Tapable.apply is deprecated. Call apply on the plugin directly instead
10% building modules 8/12 modules 4 active …e-demo/node_modules/vue/dist/vue.esm.js/Users/ni/wt-hermes/example/20180731/vue-demo/node_modules/html-webpack-plugin/lib/compiler.js:81
       var outputName = compilation.mainTemplate.applyPluginsWaterfall('asset-path', outputOptions.filename, {
                                                 ^

TypeError: compilation.mainTemplate.applyPluginsWaterfall is not a function
   at /Users/ni/wt-hermes/example/20180731/vue-demo/node_modules/html-webpack-plugin/lib/compiler.js:81:51
   at compile (/Users/ni/wt-hermes/example/20180731/vue-demo/node_modules/webpack/lib/Compiler.js:296:11)
```
### 解决3
```
yarn add html-webpack-plugin
```
### 错误4
```
error Command failed.
Exit code: 128
Command: git
Arguments: ls-remote --tags --heads ssh://git@github.com/webpack-contrib/html-webpack-plugin.git
Directory: /Users/ni/wt-hermes/example/20180731/vue-demo
Output:
ERROR: Repository not found.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
### 解决4
```
yarn add html-webpack-plugin
```
### 错误5: 相应的依赖包需要增加
```
Module build failed (from ./node_modules/eslint-loader/index.js):
TypeError: Cannot read property 'eslint' of undefined
    at Object.module.exports (/Users/ni/wt-hermes/example/20180731/vue-demo/node_modules/eslint-loader/index.js:148:18)
```
### 解决5
```
yarn add eslint
yarn add webpack-cli --dev
yarn upgrade extract-text-webpack-plugin@next
yarn add vue-loader
yarn add eslint-loader
```


## npm run build 的一些错误 参考： https://blog.csdn.net/harsima/article/details/80819747

### 错误6
```
⠙ building for production...(node:64964) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
⠋ building for production.../Users/ni/wt-hermes/example/20180731/vue-demo/node_modules/webpack/lib/TemplatedPathPlugin.js:43
				throw new Error(
				^

Error: Path variable [contenthash] not implemented in this context: static/css/[name].[contenthash].css
```

### 解决方案
### yarn add mini-css-extract-plugin
### utils.js 文件中删除extract-text-webpack-plugin, 增加 mini-css-extract-plugin
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

....

return [MiniCssExtractPlugin.loader].concat(loaders)
```
### webpack.pro.conf.js 文件中删除extract-text-webpack-plugin, 增加 mini-css-extract-plugin
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

....
new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: utils.assetsPath('css/[name].[chunkhash].css'),
  chunkFilename: utils.assetsPath('css/[id].[chunkhash].css'),
}),

```

### 将js文件改写成ts文件可能遇到的错误

### 1: tsconfig.json: 添加 "noImplicitAny": false
```
implicitly has an 'any' type
```
### 2. add package: vue-class-component
```
[Vue warn]: Property or method "isShow" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.
```
### 3: tsconfig.json: 添加 "experimentalDecorators": true
```
TS1219: Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option to remove this warning.
```
