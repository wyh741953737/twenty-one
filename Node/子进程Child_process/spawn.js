const { spawn } = require('child_process')

const bat = spawn('cmd.exe', ['/c', 'my.bat'])

bat.stdout.on('data', (data) => {
  console.log(data.toString('utf-8'))
})

bat.stderr.on('data', (data) => {
  console.log(data.toString('utf-8'))
})

bat.on('exit', (code) => {
  console.log('子进程退出码：', code)
})
