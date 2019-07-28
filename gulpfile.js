const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');

const srcPath = './src/**';
const distPath = './dist/';

const lessFiles = ['./src/*.less'];
const wxmlFiles = [`${srcPath}/*.wxml`];
const jsonFiles = [`${srcPath}/*.json`];
const jsFiles = [`${srcPath}/*.js`];
const imgFiles = [`${srcPath}/*.{png,jpg,gif,ico}`];

/* 编译wxml文件 */
const wxml = () => {
  return gulp.src(wxmlFiles, { since: gulp.lastRun(wxml) }).pipe(gulp.dest(distPath));
};
gulp.task(wxml);

/* 编译JS文件 */
const js = () => {
  return gulp.src(jsFiles, { since: gulp.lastRun(js) }).pipe(gulp.dest(distPath));
};
gulp.task(js);
/* 编译json文件 */
const json = () => {
  return gulp.src(jsonFiles, { since: gulp.lastRun(json) }).pipe(gulp.dest(distPath));
};
gulp.task(json);

/* 编译less文件 */
const wxss = () => {
  return gulp
    .src(lessFiles)
    .pipe(less())
    .pipe(rename({ extname: '.wxss' }))
    .pipe(gulp.dest(distPath));
};
gulp.task(wxss);

/* 编译压缩图片 */
const img = () => {
  return gulp
    .src(imgFiles, { since: gulp.lastRun(img) })
    .pipe(imagemin())
    .pipe(gulp.dest(distPath));
};
gulp.task('img', img);

/* copy src目录下所有的文件到dist目录 */
gulp.task('copy', function() {
  return gulp.src(`${srcPath}/*`).pipe(gulp.dest(distPath));
});

/* 清除dist目录 */
gulp.task('clean', done => {
  del.sync(['dist/**/*']);
  done();
});

/* watch */
gulp.task('watch', () => {
  const watchLessFiles = [...lessFiles];
  watchLessFiles.pop();
  gulp.watch(watchLessFiles, wxss);
  gulp.watch(jsFiles, js);
  gulp.watch(imgFiles, img);
  gulp.watch(jsonFiles, json);
  gulp.watch(wxmlFiles, wxml);
});

/* build */
gulp.task('build', gulp.series('clean', gulp.parallel('wxml', 'js', 'json', 'wxss', 'img')));

/* dev */
gulp.task('dev', gulp.series('clean', gulp.parallel('wxml', 'js', 'json', 'wxss', 'img'), 'watch'));

/* test */
gulp.task('test', gulp.series('clean', gulp.parallel('wxml', 'js', 'json', 'wxss', 'img')));
