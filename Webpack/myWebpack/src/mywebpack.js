const { SyncHook } = require('tapable')
function webpack(options) {
    const mergeOptions = _mergeOptions(options)
    const compiler = new Compiler(mergeOptions)
    _loadPlugins(options.plugins, compiler)
}

function _mergeOptions(options) {
    const shellOptions = process.argv.slice(2).reduce((option, arg) => {
        const [key, value] = argv.split('=')
        if(key && value) {
            const parseKey = key.slice(2)
            option[parseKey] = value
        }
        return option
    }, {})
    return {...options, ...shellOptions}
}

class Compiler {
    constructor(options) {
        this.options = options
        this.rootPath = this.options.context || toUnixPath(process.cwd())
        this.hooks = {
            run: new SyncHook(), // 开始编译时的钩子
            emit: new SyncHook(), // 输出asset到output之前的钩子
            done: new SyncHook() // compilation完成时执行
        }
        this.entries = new Set() // 保存所有入口模块对象
        this.modules = new Set() // 保存所有依赖模块对象
        this.chunks = new Set() // 所有代码块对象
        this.assets = new Set() // 保存本次编译所有产出的文件对象
        this.files = new Set() // 保存本次编译所有产出的文件名
    }
    run(callback) {
        this.hooks.run.call() // run启动编译，触发开始编译的plugin
        const entry = this.getEntry() // 获取入口配置对象
        this.buildEntryModule(entry)
    }
    getEntry() {
        let entry = Object.create(null)
        const { entry: optionsEntry } = this.options
        if(typeof optionsEntry === 'string') {
            entry['main'] = optionsEntry
        } else {
            entry = optionsEntry
        }
        Object.keys(entry).forEach(key => {
            const val = entry[key]
            if(!path.isAbsolute(val)) {
                entry[key] = toUnixPath.join(this.rootPath, val) // 变成绝对路径
            }
        })
        return entry
    }
    buildEntryModule(entry) {
        Object.keys(entry).forEach(entryName => {
            const entryPath = entry[entryName]
            const entryObj = this.buildModule(entryName, entryPath)
            this.entries.add(entryObj)
            // 根据当前入口文件和模块的相互依赖关系，组装成一个个包含当前入口所有依赖模块的chunks
            this.buildUpChunk(entryName, entryPath)
        })
    }
    buildUpChunk(entryName, entryPath) {
        const chunk = {
            name: entryName,
            entryModule: entryObj,
            modules: Array.form(this.modules).filter(i => i.name.includes(entryName))
        }
        this.chunks.add(chunk)
    }


    buildModule(moduleName, modulePath) {
        const originSourceCode = ((this.originSourceCode = fs.readFileSync(modulePath, 'utf-8')))
        this.moduleCode = originSourceCode
        this.handleLoader(modulePath)
        const module = this.handleWebpackCompiler(moduleName, modulePath)
        return module
    }
    handleLoader(modulePath) {
        const matchLoaders = []
        const rules = this.options.module.rules
        rules.forEach(loader => {
            const testRule = loader.test
            if(testRule.test(modulePath)) {
                if(loader.loader) {
                    matchLoaders.push(loader.loader)
                } else {
                    matchLoaders.push(...loader.use)
                }
            }
        })
        for(let i = matchLoaders.length-1; i >= 0; i--) {
            const loaderFn = require(matchLoaders[i])
            this.moduleCode = loaderFn(this.moduleCode)
        }        
    }
    // webpack处理经过plugins和loader处理的代码
    handleWebpackCompiler(moduleName, modulePath) {
        const moduleId = './' + path.posix.relative(this.rootPath, modulePath) // 计算出相对路径作为模块id
        const module = {
            id: moduleId,
            dependencies: new Set(), // 该模块所依赖模块绝对路径地址
            name: [moduleName] // 存储该模块被其他模块引用的名称
        }
        const ast = parser.pase(this.moduleCode, {sourceType: module})
        traverse(ast, { // 深度递归ast
            CallExpression: (nodePath) => { // 遇到require语法时候会执行这个函数
                const node = nodePath.node
                if(node.callee.name === 'require') {
                    const requirePath = node.arguments[0].value // 获取源代码引入模块的相对路径
                    const moduleDirName = path.posix.dirname(modulePath) // 获取目录名字
                    const absolutePath = tryExtensions(path.posix.join(moduleDirName, requirePath), this.options.resolve.extensions, requirePath, moduleDirName)
                    const moduleId = './' + path.posix.relative(this.rootPath, absolutePath)
                    node.callee = t.identifier('__webpack_require__') // 通过babel修改源代码中的require成__webpack_require__
                    node.arguments = [t.stringLiteral(moduleId)]
                    const alreadyModulesIds = Array.form(this.modules).map(i => i.id)
                    if(!alreadyModulesIds.includes(moduleId)) { // 如果当前依赖不存在modules中，加进去，否则将模块名称加进去
                        module.dependencies.add(moduleId) // 为当前模块添加require语句造成的依赖
                    } else {
                        this.modules.forEach(value => {
                            if(value.id === moduleId) {
                                value.name.push(moduleName)
                            }
                        })
                    }
                }
            }
        })
        const { code } = generator(ast)
        module._source = code
        module.dependencies.forEach(dependency => {
            const depModule = this.buildModule(moduleName, dependency)
            this.modules.add(depModule)
        })
        return module
    }
}
function _loadPlugins(plugins, compiler) {
    if(plugins && Array.isArray(plugins)) {
        plugins.forEach(plugin => {
            plugin.apply(compiler)
        })
    }
}


module.exports = webpack

class PluginA {
    apply(compiler) {
        compiler.hooks.run.tap('plugin A', () => {

        })
    }
}

function loader1(sourceCode) {
    return sourceCode + '\n, const loader = xxx'
}

function toUnixPath(path) {
    return path.replace(/\\/g, '/')
}