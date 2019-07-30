/* eslint-disable no-console */
const gulp = require('gulp');
const clean = require('./build/clean');
const compileTs = require('./build/compileTs');
const compileLess = require('./build/compileLess');
const copyJson = require('./build/copyJson');
const copyWxml = require('./build/copyWxml');
const copyJs = require('./build/copyJs');
const copyAssets = require('./build/copyAssets');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const cwd = process.cwd();

/* compile */
function compile(filePath) {
  console.info(chalk.green(`编译完成：${path.basename(filePath)}}`));
  if (filePath.endsWith('.ts')) {
    compileTs(filePath);
  } else if (filePath.endsWith('.less')) {
    compileLess(filePath);
  } else if (filePath.endsWith('.wxml')) {
    copyWxml(filePath);
  } else if (filePath.endsWith('.json')) {
    copyJson(filePath);
  } else if (filePath.endsWith('.js')) {
    copyJs(filePath);
  } else {
    copyAssets(filePath);
  }
}

/* watch */
function watch() {
  console.log(chalk.blue(`正在监听文件...}`));
  const watcher = gulp.watch('src/**/**');

  watcher.on('change', function(filePath) {
    compile(filePath);
  });

  watcher.on('add', function(filePath) {
    compile(filePath);
  });

  watcher.on('unlink', function(filePath) {
    let distFile = filePath.replace(/^src\b/, 'dist');
    let absolutePath = '';
    if (distFile.endsWith('.ts')) {
      distFile = distFile.replace(/.ts$/, '.js');
    } else if (distFile.endsWith('.less')) {
      distFile = distFile.replace(/.less$/, '.wxss');
    }
    absolutePath = path.join(cwd, distFile);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(chalk.yellow(`删除文件：${path.basename(distFile)}}`));
    }
  });
}

/* tasks */
const tasks = [clean, gulp.parallel([compileTs, compileLess, copyJson, copyWxml, copyJs]), copyAssets];

/* 开发环境 监听文件 */
if (process.env.NODE_ENV === 'development') {
  tasks.push(watch);
}

gulp.task('default', gulp.series(tasks));

gulp.task('watch', watch);
