/*
 * @Author: dyr
 * @Description: 编译less文件为wxss文件
 * @Date: 2019-06-11 02:55:08
 * @LastEditors: dyr
 * @LastEditTime: 2019-07-30 11:01:27
 */

const gulp = require('gulp');
const { less, postcss, rename } = require('gulp-load-plugins')();
const path = require('path');
const cwd = process.cwd();
const plugins = [
  require('postcss-pxtorpx')({
    multiplier: 2,
    propList: ['*'],
  }),
];

module.exports = function compileLess(filePath) {
  let file = 'src/**/*.less';
  let dist = 'dist';
  if (typeof filePath === 'string') {
    file = path.join(cwd, filePath);
    dist = path.dirname(file.replace(/src/, 'dist'));
  }
  return gulp
    .src(file)
    .pipe(less())
    .pipe(postcss(plugins))
    .pipe(
      rename({
        extname: '.wxss',
      }),
    )
    .pipe(gulp.dest(dist));
};
