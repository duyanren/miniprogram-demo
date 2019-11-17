/*
 * @Author: dyr
 * @Description: gulp task
 * @Date: 2019-09-27 16:33:12
 * @LastEditors: dyr
 * @LastEditTime: 2019-11-17 14:00:10
 */
/* eslint-disable indent */
const gulp = require('gulp');
const gulpif = require('gulp-if');
const autoprefixer = require('autoprefixer');
const mergeStream = require('merge-stream');
const del = require('del');
const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const cwd = process.cwd();
// const chalk = require('chalk');
const {
  jsonminify,
  babel,
  terser,
  less,
  rename,
  postcss,
  csso,
  replace,
  bump,
  git,
  plumber,
  debug,
  tsAlias,
  typescript,
} = require('gulp-load-plugins')();

const {
  copyWxmlPath,
  copyJsonPath,
  compileJsPath,
  compileCssPath,
  copyAssetsPath,
  copyExcludePath,
  formatWxssPath,
} = require('./path.config');

/*----------------- clean dist ----------------- */

function clean() {
  if (!fs.existsSync(path.join(cwd, 'dist'))) {
    fs.mkdirSync('dist');
    return Promise.resolve(null);
  }
  return del('*', {
    force: true,
    cwd: path.join(cwd, 'dist'),
  });
}

/*-----------------copy wxml ----------------- */
function copyWxml(filePath) {
  let file = copyWxmlPath;
  let dist = 'dist';
  if (typeof filePath === 'string') {
    file = path.join(cwd, filePath);
    dist = path.dirname(file.replace(/src/, 'dist'));
  }
  return (
    gulp
      .src(file)
      .pipe(
        debug({
          title: 'debug',
        }),
      )
      .pipe(plumber())
      // wxml不进行压缩 直接copy 绑定的事件名称有可能会转成小写 导致事件不生效
      // .pipe(
      //   gulpif(
      //     process.env.NODE_ENV === 'production',
      //     htmlmin({
      //       removeComments: true,
      //       keepClosingSlash: true,
      //     }),
      //   ),
      // )
      .pipe(gulp.dest(dist))
  );
}

/*-----------------copy json ----------------- */

function copyJson(filePath) {
  let file = copyJsonPath;
  let dist = 'dist';
  if (typeof filePath === 'string') {
    // 如果 直接使用传入的 file ， 生成的文件会直接拼接 dist + file
    // 必须使用绝对路径， 同时输出目录也要更改
    file = path.join(cwd, filePath);
    dist = path.dirname(file.replace(/src/, 'dist'));
  }
  return gulp
    .src(file)
    .pipe(plumber())
    .pipe(gulpif(process.env.NODE_ENV === 'production', jsonminify()))
    .pipe(gulp.dest(dist));
}

/*-----------------compile js ----------------- */

function compileJs(filePath) {
  let file = compileJsPath;
  let dist = 'dist';
  if (typeof filePath === 'string') {
    file = path.join(cwd, filePath);
    dist = path.dirname(file.replace(/src/, 'dist'));
  }
  const tsProject = typescript.createProject('tsconfig.json');
  return (
    gulp
      .src(file)
      .pipe(plumber())
      .pipe(
        debug({
          title: 'debug',
        }),
      )
      // .pipe(gulpif(process.env.NODE_ENV !== 'production', plumber()))
      // resove ts alias
      .pipe(tsAlias({ configuration: tsProject.config }))
      .pipe(tsProject())
      .pipe(babel())
      // 生产环境压缩js代码
      .pipe(
        gulpif(
          process.env.NODE_ENV === 'production',
          terser({
            compress: {
              toplevel: true,
              drop_console: true,
            },
            mangle: {
              toplevel: true,
            },
          }),
        ),
      )
      .pipe(gulp.dest(dist))
  );
}

/*-----------------compile css ----------------- */

function compileCss(filePath) {
  let file = compileCssPath;
  let dist = 'dist/';
  if (typeof filePath === 'string') {
    file = path.join(cwd, filePath);
    dist = path.dirname(file.replace(/src/, 'dist'));
  }
  return gulp
    .src(file)
    .pipe(
      debug({
        title: 'debug',
      }),
    )
    .pipe(plumber())
    .pipe(
      replace(/(@import.+;)/g, ($1, $2) => {
        return `/** ${$2} **/`;
      }),
    )
    .pipe(less())
    .pipe(replace(/(\/\*\*\s{0,})(@.+)(\s{0,}\*\*\/)/g, ($1, $2, $3) => $3.replace(/\.less/g, '.wxss')))
    .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 5.1'])]))
    .pipe(csso())
    .pipe(
      rename({
        extname: '.wxss',
      }),
    )
    .pipe(gulp.dest(dist));
}

/*-----------------copy assets ----------------- */

function copyAssets(filePath) {
  let file = copyAssetsPath;
  let dist = 'dist';
  if (typeof filePath === 'string') {
    file = path.join(cwd, filePath);
    dist = path.dirname(file.replace(/src/, 'dist'));
  }
  return gulp
    .src(file)
    .pipe(plumber())
    .pipe(gulp.dest(dist));
}

/*-----------------copy ares-baidu | copy artifacts ----------------- */

function copyAresBaiduWithArtifacts() {
  let file = copyExcludePath;
  let dist = 'dist';
  return gulp.src(file, { base: './src' }).pipe(gulp.dest(dist));
}

/*-----------------format wxss to css  ----------------- */

function formatWxssToCss() {
  let file = formatWxssPath;
  let dist = 'jscpd';
  return gulp
    .src(file)
    .pipe(
      rename({
        extname: '.css',
      }),
    )
    .pipe(gulp.dest(dist));
}

/*----------------- clean jscpd ----------------- */

function cleanJscpd() {
  if (!fs.existsSync(path.join(cwd, 'jscpd'))) {
    fs.mkdirSync('jscpd');
    return Promise.resolve(null);
  }
  return del('*', {
    force: true,
    cwd: path.join(cwd, 'jscpd'),
  });
}

/*-----------------copy all file except wxss to jscpd  ----------------- */

function copyToJsCpd() {
  return gulp.src(['src/**/*', '!src/**/*.wxss', '!src/artifacts/**/*']).pipe(gulp.dest('jscpd'));
}

/*----------------- update app version ----------------*/
const getPackageJson = () => {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};
const getVersion = branch => {
  const DEFAULT_VERSION = getPackageJson().version;
  if (argv.v) {
    // 手动维护自定义版本号
    return argv.v;
  }
  // 测试tag分支直接取默认版本号
  if (branch.includes('release') || branch.includes('feature') || branch === 'master') return DEFAULT_VERSION;
  // 读取dev分支版本号
  if (branch.split('/')[1]) {
    try {
      return branch
        .split('/')[1]
        .split('_')[0]
        .substring(1);
    } catch (error) {
      return DEFAULT_VERSION;
    }
  }
  return DEFAULT_VERSION;
};
function updateVersion() {
  return git.revParse({ args: '--abbrev-ref HEAD' }, function(err, branch) {
    const version = getVersion(branch);
    const versionStream = gulp
      .src('./src/constants/version.config.ts')
      .pipe(bump({ version: String(version) }))
      .pipe(gulp.dest('./src/constants/'));
    const pkgStream = gulp
      .src('./package.json')
      .pipe(bump({ version: String(version) }))
      .pipe(gulp.dest('./'));
    return mergeStream(versionStream, pkgStream);
  });
}

/*------------ create tag -------------- */

function creatTag() {
  return git.revParse({ args: '--abbrev-ref HEAD' }, function(err, branch) {
    const tag = `release/${branch.split('/')[1].split('_')[0]}`;
    return git.tag(
      tag,
      'Created Tag for version: ' +
        branch
          .split('/')[1]
          .split('_')[0]
          .substring(1),
      function(error) {
        if (error) {
          throw new Error(error);
        }
        git.push('origin', { args: '--tags' });
      },
    );
  });
}

module.exports = {
  copyAresBaiduWithArtifacts,
  copyAssets,
  clean,
  copyWxml,
  compileCss,
  compileJs,
  copyJson,
  copyToJsCpd,
  cleanJscpd,
  formatWxssToCss,
  updateVersion,
  creatTag,
};
