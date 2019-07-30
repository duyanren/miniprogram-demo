const gulp = require('gulp');
const path = require('path');
const cwd = process.cwd();
module.exports = function copyAssets(filePath) {
  let file = 'src/**/**';
  let dist = 'dist';
  if (typeof filePath === 'string') {
    file = path.join(cwd, filePath);
    dist = path.dirname(file.replace(/src/, 'dist'));
  }
  return gulp.src([file, '!**/*.json', '!**/*.ts', '!**/*.js', '!**/*.less', '!**/*.wxml']).pipe(gulp.dest(dist));
};
