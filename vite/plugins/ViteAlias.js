const fs = require('fs')
const path = require('path')
function diffDirAndFile(dirFiles = [], basePath='') {
    const result = {
        dirs: [],
        files: []
    }
    dirFiles.forEach(name => {
        const currentFileStat = fs.statSync(path.resolve(__dirname, basePath+'/'+name)) // 读取文件信息：path，大小啥的
        const isDirectory =  currentFileStat.isDirectory()
        if(isDirectory) {
            result.dirs.push(name)
        } else {
            result.files.push(name)
        }
    })
    return result
}
function  getDir(keyName) {
    const result = fs.readdirSync(path.resolve(__dirname, '../src')) // 将目录读出来了 ['assets', 'components']
    const diffResult = diffDirAndFile(result)
    const resolveAliasObj = {}
    diffResult.dirs.forEach(dirname => {
        const key = `@${keyName}${dirname}`
        const abspath = path.resolve(__dirname, '../src'+'/'+dirname)
        resolveAliasObj[key] = abspath

    })
    return resolveAliasObj
}
module.exports = ({keyName='@'}) => {
    return {
        config(config, env) { // config是目前一个配置对象，env是mode和（development或者production）command（serve | build | yarn dev就是命令）
            // config可以返回一个对象，这个对象是部分配置viteConfig
            console.log(config, env); // vite运行在node环境，所以在控制台看到打印的内容4
            // 通过vite.config.js返回的配置对象以及我们在插件的c返回的对象都不是最终对象。vite会将几个对象合并
            const resolveAlias = getDir(keyName)
            return {
                resolve: {
                    alias: resolveAlias
                }
            }

        }
    }
}