const { unlink } = require('fs')

// 删除文件
unlink('cc.doc', err => {
  console.log(err)
})