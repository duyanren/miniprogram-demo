/*
 * @Author: dyr
 * @Description: gulp 构建
 * @Date: 2019-09-17 17:23:04
 * @LastEditors: dyr
 * @LastEditTime: 2019-11-17 13:38:25
 */
/* eslint-disable no-console */
const gulp = require('gulp');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const {
  clean,
  copyWxml,
  copyJson,
  compileJs,
  compileCss,
  copyAssets,
  copyAresBaiduWithArtifacts,
  cleanJscpd,
  copyToJsCpd,
  formatWxssToCss,
  updateVersion,
  creatTag,
} = require('./build/tasks');
const cwd = process.cwd();

function compile(filePath) {
  if (filePath.includes('artifacts') || filePath.includes('ares-baidu')) {
    return copyAresBaiduWithArtifacts(filePath);
  }
  console.info(chalk.green(`编译完成：${path.basename(filePath)}`));
  if (filePath.endsWith('.ts') || filePath.endsWith('.js')) {
    compileJs(filePath);
  } else if (
    filePath.endsWith('.less') ||
    filePath.endsWith('.css') ||
    filePath.endsWith('.sass') ||
    filePath.endsWith('.wxss')
  ) {
    compileCss(filePath);
  } else if (filePath.endsWith('.wxml') || filePath.endsWith('.swan')) {
    copyWxml(filePath);
  } else if (filePath.endsWith('.json')) {
    copyJson(filePath);
  } else {
    copyAssets(filePath);
  }
}

/* watch */
function watch() {
  console.log(chalk.blue(`正在监听文件...`));
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
      console.log(chalk.yellow(`删除文件：${path.basename(distFile)}`));
    }
  });
}

/* tasks */
const buildTasks = gulp.parallel([compileJs, compileCss, copyJson, copyWxml, copyAssets, copyAresBaiduWithArtifacts]);

/* 开发环境 监听文件 */
if (process.env.NODE_ENV === 'development') {
  gulp.task('default', gulp.series([clean, gulp.parallel([watch, buildTasks])]));
} else {
  gulp.task(
    'default',
    gulp.series([clean].concat(buildTasks), done => {
      console.log(chalk.blue(`build成功...`));
      done();
    }),
  );
}

gulp.task('watch', watch);

// 统计代码重复率tasks
const buildJsCpdTasks = [gulp.parallel([copyToJsCpd, formatWxssToCss])];
gulp.task(
  'jscpd',
  gulp.series([cleanJscpd].concat(buildJsCpdTasks), done => {
    console.log(chalk.blue(`jscpd文件生成成功,开始统计代码重复率中....`));
    done();
  }),
);

gulp.task('clean-cpd', gulp.series(cleanJscpd));

// 更新版本号
gulp.task(
  'bumpversion',
  gulp.series(updateVersion, async () => {
    await console.log(chalk.blue(`版本号已更新`));
  }),
);

// 创建tag
gulp.task('tag', creatTag);
