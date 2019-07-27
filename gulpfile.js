const gulp = require('gulp');
const del = require('del');

/* copy src目录下所有的文件到dist目录 */
gulp.task('copy', function() {
  return gulp.src('src/**/*').pipe(gulp.dest('dist'));
});

/* 清除dist目录 */
gulp.task('clean', done => {
  del.sync(['dist/**/*']);
  done();
});

/* watch */
gulp.task('watch', () => {
  gulp.watch('src/**/*', gulp.series('clean', 'copy'));
});

/* dev */
gulp.task('dev', gulp.series('clean', 'copy', 'watch'));

/* build */
gulp.task('build', gulp.series('clean', 'copy'));
