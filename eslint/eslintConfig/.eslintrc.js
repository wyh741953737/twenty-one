module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'vue',
    'html',
    '@typescript-eslint'
  ],
  rules: {
    // 关闭 This line has a length of 129. Maximum allowed is 100.
    'max-len': 0,
    // 关闭 'webpack-merge' should be listed in the project's dependencies, not devDependencies.
    'import/no-extraneous-dependencies': 0,
    // 关闭 Unexpected use of file extension 'js' for './webpack.common.config.js'
    'import/extensions': 0,
    // 关闭 Unexpected block statement surrounding arrow body; move the returned value immediately after the `=>`.
    'arrow-body-style': 0,
    'import/no-unresolved': 0,
    'comma-dangle': ['error', 'never'], // 是否允许对象中出现结尾逗号
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0, // 不允许出现console语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 不允许出现debugger语句
    'no-dupe-args': 2, // 函数定义的时候不允许出现重复的参数
    'no-dupe-keys': 2, // 对象中不允许出现重复的键
    'no-duplicate-case': 2, // switch语句中不允许出现重复的case标签
    'no-empty': 2, // 不允许出现空的代码块
    'no-extra-boolean-cast': 2, // 不允许出现不必要的布尔值转换
    'no-extra-parens': 0, // 不允许出现不必要的圆括号
    'no-extra-semi': 2, // 不允许出现不必要的分号
    'no-func-assign': 2, // 不允许重新分配函数声明
    'no-invalid-regexp': 2, // 不允许在RegExp构造函数里出现无效的正则表达式
    'no-irregular-whitespace': 2, // 不允许出现不规则的空格
    'no-regex-spaces': 2, // 正则表达式中不允许出现多个连续空格
    'quote-props': 2, // 对象中的属性名是否需要用引号引起来
    'no-sparse-arrays': 2, // 数组中不允许出现空位置
    'no-unreachable': 2, // 在return，throw，continue，break语句后不允许出现不可能到达的语句
    'use-isnan': 2, // 要求检查NaN的时候使用isNaN()
    'block-scoped-var': 2, // 将变量声明放在合适的代码块里
    'default-case': 0, // 在switch语句中需要有default语句
    eqeqeq: ['error', 'smart'], // 比较的时候使用严格等于
    'no-alert': 1, // 不允许使用alert，confirm，prompt语句
    'no-caller': 2, // 不允许使用arguments.callee和arguments.caller属性
    'guard-for-in': 0, // 监视for in循环，防止出现不可预料的情况
    'no-div-regex': 2, // 不能使用看起来像除法的正则表达式
    'no-else-return': 0, // 如果if语句有return，else里的return不用放在else里
    'no-eq-null': 2, // 不允许对null用==或者!=
    'no-eval': 2, // 不允许使用eval()
    'no-floating-decimal': 2, // 不允许浮点数缺失数字
    'no-lone-blocks': 2, // 不允许不必要的嵌套代码块
    'no-multi-str': 2, // 不允许用\来让字符串换行
    'no-new': 2, // 不允许new一个实例后不赋值或者不比较
    'no-new-func': 2, // 不允许使用new Function
    'no-param-reassign': 0, // 不允许重新分配函数参数
    'no-redeclare': 2, // 不允许变量重复声明
    'no-return-assign': 2, // 不允许在return语句中使用分配语句
    'no-script-url': 2, // 不允许使用javascript:void(0)
    'no-self-compare': 2, // 不允许自己和自己比较
    'no-sequences': 2, // 不允许使用逗号表达式
    'no-throw-literal': 2, // 不允许抛出字面量错误 throw "error"
    'no-unused-expressions': 2, // 不允许无用的表达式
    'wrap-iife': [2, 'any'], // 立即执行表达式的括号风格
    'no-label-var': 2, // 不允许标签和变量同名
    'no-shadow': 2, // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    'no-shadow-restricted-names': 2, // js关键字和保留字不能作为函数名或者变量名
    'no-undef': 2, // 不允许未声明的变量
    'no-undef-init': 2, // 不允许初始化变量时给变量赋值undefined
    'no-undefined': 2, // 不允许把undefined当做标识符使用
    'no-unused-vars': [2, { vars: 'all', args: 'after-used' }], // 不允许有声明后未使用的变量或者参数
    'no-use-before-define': [2, 'nofunc'], // 不允许在未定义之前就使用变量
    indent: 2, // 强制一致的缩进风格
    'brace-style': [2, '1tbs', { allowSingleLine: false }], // 大括号风格
    camelcase: [2, { properties: 'never' }], // 强制驼峰命名规则
    'comma-style': [2, 'last'], // 逗号风格
    'consistent-this': [0, 'self'], // 当获取当前环境的this是用一样的风格
    'eol-last': 2, // 文件以换行符结束
    'func-names': 0, // 函数表达式必须有名字
    'func-style': 0, // 函数风格，规定只能使用函数声明或者函数表达式
    'key-spacing': [2, { beforeColon: false, afterColon: true }], // 对象字面量中冒号的前后空格
    'max-nested-callbacks': 0, // 回调嵌套深度
    'new-cap': [2, { newIsCap: true, capIsNew: false }], // 构造函数名字首字母要大写
    'new-parens': 2, // new时构造函数必须有小括号
    'newline-after-var': 0, // 变量声明后必须空一行
    'no-array-constructor': 2, // 不允许使用数组构造器
    'no-inline-comments': 0, // 不允许行内注释
    'no-lonely-if': 0, // 不允许else语句内只有if语句
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'], // 不允许混用tab和空格
    'no-multiple-empty-lines': [2, { max: 2 }], // 空行最多不能超过两行
    'fun-call-spacing': 0, // 函数调用时，函数名与()之间不能有空格
    'no-trailing-spaces': 2, // 一行最后不允许有空格
    'no-underscore-dangle': 2, // 不允许标识符以下划线开头
    'padded-blocks': [2, 'never'], // 块内行首行尾是否空行
    quotes: [1, 'single', 'avoid-escape'], // 引号风格
    semi: [2, 'never'], // 禁止使用分号
    'sort-vars': 0, // 变量声明时排序
    'space-before-blocks': [2, 'always'], // 块前的空格
    'space-before-function-paren': [2, { anonymous: 'always', named: 'never' }], // 函数定义时括号前的空格
    'space-infix-ops': [2, { int32Hint: true }], // 操作符周围的空格
    'keyword-spacing': 2, // 关键字前后的空格
    'space-unary-ops': [2, { words: true, nonwords: false }], // 一元运算符前后不要加空格
    'wrap-regex': 2, // 正则表达式字面量用括号括起来
    'no-var': 0, // 使用let和const代替var
    'no-plusplus': 0, // 不允许使用++ --运算符
    'accessor-pairs': 2 // 强制 getter 和 setter 在对象中成对出现
  }
}
