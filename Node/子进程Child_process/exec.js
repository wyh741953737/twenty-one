const {exec} = require('child_process')
// exec('my.bat', (err, stdout, stderr) => {
//   if(err) {
//     console.log(err)
//     return
//   }
//   console.log(stdout)
// })

// 执行ls列出当前目录
exec('ls', (err, stdout, stderr) => {
  if(err) {
    console.log(err)
    return
  }
  console.log(err, stdout, stderr)
})
// -c是传参数，不安全，比如 $path = '../\rm -rf'删除，是危险的，所以不安全，execSync通过数组传参数可以过滤出不安全的命令
// exec('ls -c ${path}', (err, stdout, stderr) => {
//   if(err) {
//     console.log(err)
//     return
//   }
//   console.log(err, stdout, stderr)
// })
// 通过流的方式接收结果，类似文件读取，不需要等全部
let child = exec('ls')
child.stdout.on('data', (data) => {
  console.log(data)
})

child.stderr.on('data', (err) => {
  console.log(err)
})