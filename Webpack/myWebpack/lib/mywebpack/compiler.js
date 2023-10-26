const { getAst, getDeps, getCode } = require('./parser');
const fs = require('fs');
const path = require('path');

function mywebpack(config) {
  return new Compiler(config);
}

class Compiler {
  constructor(options = {}) {
    this.options = options;
    this.modules = []; // 所有依赖容器
  }
  // 启动webpack打包
  run() {
    const filePath = this.options.entry;
    // 第一次构建得到入口文件信息
    const fileInfo = this.build(filePath);
    this.modules.push(fileInfo);
    this.modules.forEach(fileInfo => {
      /**
       * desp：
       * {
       *   './add.js': 'G:/study..../add.js',
       *   './count.js': 'G:/study..../count.js',
       *  '.total.js': 'G:/stud.../total.js' total中引入了count.js
       * }
       */
      const deps = fileInfo.deps;
      for (const relativePath in deps) {
        const absolute = deps[relativePath];
        const fileInfo = this.build(absolute);
        this.modules.push(fileInfo);
        // 将依赖整理成一个对象，
        /**
         * {
         *   'index.js': {
         *    code: 'xxx',
         *    deps: { 'add.js': 'xxx'}
         *   }
         * }
         */
        this.modules.reduce((graph, module) => {
          return {
            ...graph,
            [module.filePath]: {
              code: module.code,
              deps: module.deps
            }
          }
        }, {})
      }
    })
  }
  // 开始构建
  build(filePath) {
    const ast = getAst(filePath);
    const deps = getDeps(ast, filePath);
    const code = getCode(ast);
    return {
      filePath,
      deps,
      code
    }
  }
  // 生成输出资源
  generate(depsGraph) {
    const bundle = `
     (function(depsGraph) {
       function require(module) {
        function localRequire(relativePath) {
          // 为了找到要引入模块的绝对路径，通过require加载
          return require(depsGraph[module].desp[relativePath])
        }
        let exports = {}
        (function(require, exports, code) {
          eval(code)
        })(localRequire, exports, depsGraph[module].code)
        return exports;
       }
      //  加载入口文件
       require('$this.options.entry')
     })(${JSON.stringify(depsGraph)})
    `
    const filePath = path.resolve(this.options.output.path, this.options.output.filename);
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}

module.exports = mywebpack;