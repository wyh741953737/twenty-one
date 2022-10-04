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

function toUnixPath(path) {
    return path.replace(/\\/g, '/')
}