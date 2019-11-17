/*
 * @Author: dyr
 * @Description: gulp 路径配置
 * @Date: 2019-09-17 17:23:04
 * @LastEditors: dyr
 * @LastEditTime: 2019-11-17 13:58:51
 */
// 直接copy到dist目录 artifacts
const excludePath = ['!src/artifacts/**/*'];
module.exports = {
  compileCssPath: ['src/**/*.{css,less,sass,wxss}', ...excludePath],
  compileJsPath: ['src/**/*.{ts,js}', ...excludePath],
  copyJsonPath: ['src/**/*.json', ...excludePath],
  copyWxmlPath: ['src/**/*.{swan,wxml}', ...excludePath],
  copyAssetsPath: ['src/**/*.{png,jpg,jpeg,gif,ico}', ...excludePath],
  copyExcludePath: [
    'src/artifacts/**/*',
    '!src/artifacts/app.json',
    '!src/artifacts/project.config.json',
    '!src/artifacts/project.swan.json',
  ],
  formatWxssPath: ['src/**/*.wxss', ...excludePath],
};
