# 小程序

## 文档说明

### 开发

```bash
1. yarn install 安装依赖
2. yarn start 启动开发 监听文件变化
```

### 常用命令

```bash

# 代码重复率
 yarn cpd

# 手动传参修改版本号
gulp bumpversion --v=4.2.0

# 跳过commit校验
git commit --no-verify -m "代码规范强制提交测试"

# 测试完成 供测试发布使用的tag标签
yarn tag
```

### commit 规范

for example:

1. 校验类型

```language
git add .
git commit -m 'fix: fix bug'
```

2. 跳过 commit、eslint 校验

```language
git add . && git commit --no-verify -m "代码规范强制提交测试"
```

### 注意事项

1. npm 包引用

- 项目中业务文件的使用请使用相对路径，不要使用绝对路径引用（使用相对路径，可以更方便的定位到具体某个文件；如果使用绝对路径，npm 解析会有可能失败，对于引用的 npm 包，根目录下会生成.cache-npm 文件，这个文件含有所有的 npm 列表）
- npm 包的使用是在编译阶段执行的，所以如果要引入 npm 包，package.json 文件安装在 devDependencies 下即可
- 引用的 npm 包，最终会打包编译到 dist/npm 目录下

2. async await 的使用

目前项目中已通过配置 babelrc 解决了 regenerator，使用时项目中无需再引入

```bash
regenerator-runtime/runtime
```

3. 如果想使用 es next 不支持的 api，可以在 babelrc.js 文件中配置相关 babel 插件解决

4. 上传代码请关闭开发者工具当中的 ES6 转 ES5 等所有的选项，build 时项目中已经对文件进行过压缩和编译了，无需二次编译和压缩

5. 编译过程中的代码转换函数已经通过抽取到 npm 包中，解决了之前每个文件都会引入代码转换的工具函数，如果 js 文件上百个，无形中导致代码体积变大
6. 微信接口 promise 化, 无需每次调用接口重新 new Promise
7. 加入 module-resolve 插件，可以通过@/引入文件

```bash
import wxp from '@/common/wxp/wxp'
```

```bash
import wxp from './common/wxp/wxp';
wxp
  .requset({ url: 'https://www.xxx', data: {} })
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {});
```

8. 加入第三方插件 Optional Chaining in TypeScript（proposal-optional-chaining 在草案阶段，并没有 ts 版的）

```bash
  // 替换if(obj && obj.propA && obj.propB && obj.propC)这种形式的写法
  import { oc } from 'ts-optchain';
  const obj: T = { /* ... */ };
  const value = oc(obj).propA.propB.propC(defaultValue);

```

### 小程序开发支持

- [x] 支持 Typescript
- [x] 支持 async、await
- [x] 支持 less、css
- [x] 支持 npm 包
- [x] 小程序接口 promise 化
- [ ] 图片自动发布到 cdn
- [ ] 小程序路由封装

### 推荐几个 vscode 插件

- [korofileheader](https://marketplace.visualstudio.com/items?itemName=OBKoro1.korofileheader)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [todo-highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [import-cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [gitlens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [githistory](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
