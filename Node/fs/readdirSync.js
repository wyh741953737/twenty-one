const { readdirSync, statSync, unlinkSync, rmdirSync, stat, rmdir, unlink } = require('fs')

// 封装一个函数用于删除文件
function reomveFile(dirPath) {
  // 同步阻塞会抛出异常，用try异常捕获，就不会阻塞后面
  try {
    // 读取目录
    const dirList = readdirSync(dirPath) // [ 'b.js', 'ddd', 'index.js' ]
    // 遍历目录
    dirList.forEach(item => {
      // 读取文件内容
      const dirContent = statSync(dirPath+'/'+item, (err, stat) => {
        console.log(err, stat)
      })
      // 如果是文件夹
      if(dirContent.isDirectory()) {
          console.log('是文件进行递归')
          reomveUnEmptyDir(dirPath+'/'+item)
      } else { // 不是文件夹就是文件
         console.log('不是文件进行删除')
         unlinkSync(dirPath+'/'+item)
      }
    })
    throw new Error('')
  } catch(e) {
  } finally {
  }
}

// 封装一个函数用于空文件夹
function reomveDir(dirPath) {
  // 同步阻塞会抛出异常，用try异常捕获，就不会阻塞后面
  try {
    // 读取目录
    const dirList = readdirSync(dirPath) // [ 'b.js', 'ddd', 'index.js' ]
    // 遍历目录
    dirList.forEach(item => {
      let empty = true
      console.log(empty)
      // 读取文件内容
      const path = dirPath+'/'+item
      console.log(path)
      const dirContent = statSync(path, (err, stat) => {})
      // 如果是文件夹
      if(dirContent.isDirectory()) {
          reomveDir(path)
      } else { // 不是文件夹就是文件
        //  unlinkSync(path)
         empty = false
      }
      console.log(empty ? '删除文件夹' : '不删除文件夹', path)
      rmdirSync(path)
    })
    throw new Error('')
  } catch(e) {
  } finally {
  }
}

reomveDir('aaa')