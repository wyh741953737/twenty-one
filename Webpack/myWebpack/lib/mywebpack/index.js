const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const { transformFromAst } = require('@babel/core');

function mywebpack(config) {
  return new Compiler(config);
}

class Compiler {
  constructor(options = {}) {
    this.options = options;
  }
  // 启动webpack打包
  run() {
    const filePath = this.options.entry;
    // 获取入口文件内容
    const file = fs.readFileSync(filePath, 'utf-8');
    // 将其解析成ast抽象语法树
   const ast = babelParser.parse(file, {
      sourceType: 'module'//解析文件的模块化方案
   });
    console.log(ast);
    // 获取文件夹路径
    const dirname = path.dirname(filePath);
    // 定义收集依赖的容器
    let deps = {}
    // 收集依赖，babel提供的traverse收集，
    traverse(ast, {
      // 内部会遍历ast中program.body,判断里面的语句类型，如果type:ImportDeclaration就会触发函数
      ImportDeclaration({node}) {
        // 文件相对路径
        const relativePath = node.source.value;
        // 生成基于入口文件的绝对路径
        const absolutePath = path.resolve(dirname, relativePath);
        deps[relativePath] = absolutePath
      }
    })
    // 编译模块,将ast编译成浏览器能够识别的
    const code =  transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
  }
}

module.exports = mywebpack;



