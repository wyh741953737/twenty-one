const chokidar = require('chokidar')
const path = require('path')


function runServer() {
  // 启动webpack服务
}

function runWatcher() {
  // 监听启动服务
  const configPath = path.resolve('./config.json')
  const watcher = chokidar.watch(process.cwd(), 'lib/start')
          .on('all', (eventName, path) => {
            console.log(eventName, path)
          })
          watcher.add(configPath)
} 

module.exports = function(arg, opts, cmd) {
  // 1:启动服务
  runServer()
  // 2：启动配置监听服务
  runWatcher()
}