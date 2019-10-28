/*
 * @Author: dyr
 * @Description:将 ECMAScript 2015 及其版本以后的 javascript 代码转为旧版本浏览器或者是环境中向后兼容版本的  javascript 代码
 * @Date: 2019-07-29 20:40:21
 * @LastEditors: dyr
 * @LastEditTime: 2019-10-28 19:04:02
 */

/**
 * @description: 编译执行的顺序
1、执行 plugins 中所有的插件
2、plugins 的插件，按照顺序依赖编译
3、所有 plugins 的插件执行完成，在执行 presets 预设。
4、presets 预设，按照倒序的顺序执行。(从最后一个执行)
5、完成编译。
 * @param {type}
 * @return:
 */

const babelOptions = {
  presets: ['@babel/preset-typescript', ['@babel/env']], // 是某一类 plugin 的集合，包含了某一类插件的所有功能
  plugins: [
    // 将某一种需要转化的代码，转为浏览器可以执行代码
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    'babel-plugin-ts-optchain',
    'babel-plugin-add-module-exports',
    'babel-plugin-array-includes',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-object-assign',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],

    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
        },
      },
    ],
    [
      'babel-plugin-copy-npm',
      {
        rootDir: 'src',
        outputDir: 'dist',
        npmDir: 'npm',
        format: 'cjs',
        strict: false,
        minify: true,
        loose: true,
        cache: false,
      },
    ],
  ],
};

// if (process.env.NODE_ENV === 'production') {
//   babelOptions.presets.unshift([
//     'minify',
//     {
//       mangle: {
//         exclude: ['wx', 'module', 'exports', '__wxConfigx', 'process', 'global'],
//       },
//       keepFnName: true,
//     },
//   ]);
// }

module.exports = babelOptions;
