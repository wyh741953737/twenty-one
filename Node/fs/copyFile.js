const { copyFile, constants } = require('fs')
const { COPYFILE_EXCL } = constants

// 将源文件内容拷贝放到目标文件,拷贝多少次都不会报错
// copyFile('cc.txt', 'copy.txt', (err) => {
//   console.log(err)
// })
// 第三个参数是flag，值是COPY_EXCL，如果目标文件存在就会报错文件早已存在
// copyFile('cc.txt', 'copy.txt', COPYFILE_EXCL, (err) => {
//   console.log(err)
// })

copyFile('cc.txt', 'copyExit.txt', COPYFILE_EXCL, (err) => {
  console.log(err)
})