/*
 * @Author: dyr
 * @Description: 编译ts文件转成js文件
 * @Date: 2019-06-11 02:55:08
 * @LastEditors: dyr
 * @LastEditTime: 2019-07-30 10:56:39
 */

const gulp = require('gulp');
const { babel } = require('gulp-load-plugins')();
const path = require('path');
const cwd = process.cwd();
module.exports = function compileJs(filePath) {
  let file = 'src/**/*.ts';
  let dist = 'dist';
  if (typeof filePath === 'string') {
    file = path.join(cwd, filePath);
    dist = path.dirname(file.replace(/src/, 'dist'));
  }
  return gulp
    .src(file)
    .pipe(babel())
    .pipe(gulp.dest(dist));
};
