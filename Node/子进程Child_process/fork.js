const { fork } = require('child_process')
const path = require('path')
const child = fork(path.resolve(__dirname, './child.js'))
child.on('message', (data) => {
  console.log('父亲接收到的数据', data)
})

child.send('父进程发消息')