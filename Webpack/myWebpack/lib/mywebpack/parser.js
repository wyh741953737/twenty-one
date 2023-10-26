const fs = require('fs');
const babelParser = require('@babel/parser');
const path = require('path/posix');
const { traverse } = require('@babel/types');
const { transformFromAst } = require('@babel/core');


const parser = {
  // 将文件抽象ast
  getAst(filePath) {
        // 获取入口文件内容
        const file = fs.readFileSync(filePath, 'utf-8');
        // 将其解析成ast抽象语法树
        const ast = babelParser.parse(file, {
          sourceType: 'module'//解析文件的模块化方案
        });
    return ast;
  },
  getDeps(ast, filePath) {
    const dirname = path.dirname(filePath);
    const deps = {};
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
    return deps;
  },
  getCode(ast) {
     // 编译模块,将ast编译成浏览器能够识别的
     const code =  transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
     })
    return code;
  }
}
module.exports = parser;