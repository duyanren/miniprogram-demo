/*
 * @Author: dyr
 * @Description: eslint 规则配置
 * @Date: 2019-09-17 17:23:03
 * @LastEditors: dyr
 * @LastEditTime: 2019-11-17 14:21:00
 */
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // 'eslint:recommended', // eslint recommended rule
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  globals: {
    // 这里填入你的项目需要的全局变量
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    getApp: true,
    getCurrentPages: true,
    wxp: true,
  },
  env: {
    //脚本目标的运行环境
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // 自定义 prettier 规则
    'prettier/prettier': [
      'error',
      {
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
      },
    ],
    // 一个缩进必须用两个空格替代
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
      },
    ],
    // 禁止使用console
    'no-console': 'warn',
    'no-debugger': 1, // 禁止 debugger 语句，
    'no-return-assign': 'warn',
    'array-callback-return': 'error', // 回调函数必须有返回值
    'guard-for-in': 'error', // for in时需检测hasOwnProperty，避免遍历到继承来的属性方法
    'default-case': 'error', // switch 语句必须包含 default
    'no-const-assign': 'error', // 禁止对const定义重新赋值
    'no-var': 'error', // 禁止 var 的使用，推荐使用 const 或 let
    'max-len': ['error', { code: 120 }], // 字符串最大长度
    eqeqeq: 'error', // 必须使用全等===进行比较，防止隐式转换带来的意外问题
    'no-undef': 'error', // 当访问当前源文件内未定义的变量时，no-undef 规则将发出警告
    'no-duplicate-imports': 2, // 禁止重复 import
    'no-duplicate-case': 2, // 禁止 switch 中出现相同的 case
    'no-else-return': 2, // 禁止出现 if (cond) { return a } else { return b }，应该写为 if (cond) { return a } return b
    'no-empty-character-class': 2, // 正则表达式中禁止出现空的字符集[]
    'no-global-assign': 2, // 禁止对全局变量赋值
    'no-extra-semi': 2, // 禁止额外的分号
    'no-eval': 2, // 禁止使用 eval
    'no-implicit-coercion': [
      // 禁止使用隐式类型转换
      2,
      {
        allow: ['+', '!!'], // 允许 + 转数值 '' + 转字符串和 !! 转布尔值
      },
    ],

    'no-implied-eval': 2, // 禁止在 setTimeout 和 setInterval 中传入字符串，因会触发隐式 eval

    'no-inner-declarations': [2, 'both'], // 禁止在块作用域内使用 var 或函数声明
    'no-irregular-whitespace': [
      // 禁止使用不规范空格
      2,
      {
        skipStrings: true, // 允许在字符串中使用
        skipComments: true, // 允许在注释中使用
        skipRegExps: true, // 允许在正则表达式中使用
        skipTemplates: true, // 允许在模板字符串中使用
      },
    ],
    'no-lone-blocks': 2, // 禁止使用无效的块作用域
    'no-multi-str': 2, // 禁止使用 \ 来定义多行字符串，统一使用模板字符串来做
    'no-mixed-spaces-and-tabs': 2, // 禁止混用空格和 tab 来做缩进，必须统一
    'no-undefined': 2, // 禁止使用 undefined，如需判断一个变量是否为 undefined，请使用 typeof a === 'undefined'
    'no-redeclare': 2, // 禁止重复声明
    'no-regex-spaces': 2, // 禁止在正则表达式中出现连续空格
    'no-self-assign': 2, // 禁止将自己赋值给自己
    'no-self-compare': 2, // 禁止自己与自己作比较
    'no-shadow-restricted-names': 2, // 禁止使用保留字作为变量名
    'no-template-curly-in-string': 2, // 禁止普通字符串中出现模板字符串语法
    'no-shadow': 2, // 禁止在嵌套作用域中出现重名的定义，如 let a; function b() { let a }
    'no-sparse-arrays': 2, // 禁止数组中出现连续逗号
    'no-this-before-super': 2, // 禁止在构造函数的 super 之前使用 this
    'no-throw-literal': 2, // 禁止 throw 字面量，必须 throw 一个 Error 对象
    'no-trailing-spaces': [
      // 禁止行尾空格
      2,
      {
        skipBlankLines: true, // 不检查空行
        ignoreComments: true, // 不检查注释
      },
    ],
    'no-unexpected-multiline': 2, // 禁止出现难以理解的多行代码
    'no-unmodified-loop-condition': 2, // 循环体内必须对循环条件进行修改
    'no-unneeded-ternary': [2, { defaultAssignment: false }], // 禁止不必要的三元表达式
    'no-unreachable': 2, // 禁止出现不可到达的代码，如在 return、throw 之后的代码
    // 禁止在finally块中出现 return、throw、break、continue
    'no-unsafe-finally': 2,
    // 禁止出现不安全的否定，如 for (!key in obj} {}，应该写为 for (!(key in obj)} {}
    'no-unsafe-negation': 2,
    // 禁止出现无用的表达式
    'no-unused-expressions': [
      2,
      {
        allowShortCircuit: true, // 允许使用 a() || b 或 a && b()
        allowTernary: true, // 允许在表达式中使用三元运算符
        allowTaggedTemplates: true, // 允许标记模板字符串
      },
    ],
    yoda: 2, // 禁止Yoda格式的判断条件，如 if (true === a)，应使用 if (a === true)
    'no-shadow': ['error', { hoist: 'functions' }],
    // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    // '@typescript-eslint/no-unused-variable': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
