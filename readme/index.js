// 多个异步请求，如何同时获取最终结果
const fs = require('fs')
const scool = {}

fs.readFile('./age.txt', 'utf8', function(err, data) {
  scool.age = data
  cb()
})
fs.readFile('./name.txt', 'utf8', function(err, data) {
  scool.name = data
  cb()
})

function after(times, cb) {
  return function() {
    if(--times === 0) {
      cb()
    }
  }
}
const cb = after(2, function() {
  console.log(scool)
})

// 数组扁平化 arr.flat
const flatten = arr => {
  return arr.reduce((a,b) => {
    if(b instanceof Array) {
      return a.concat(flatten(b))
    }
    return a.concat(b)
  }, [])
}
// 统计字符串中每个字符出现的次数
const str = 'aaadddddvdcdsdcsd'
const arr = str.split('')
const strObj = arr.reduce((all, cur) => {
  if(cur in all) {
    all[cur]++
  } else {
    all[cur] = 1
  }
  return all
}, {})

// 按顺序调用promise，将上一个promise的值作为下一个promise的value处理
const p1 = a => {
  return new Promise(resolve => {
    resolve(a)
  })
}

const p2 = a => {
  return new Promise(resolve => {
    resolve(a*2)
  })
}
const p3 = a => {
  return new Promise(resolve => {
    resolve(a*3)
  })
}
const result = [p1, p2, p3].reduce((all, cur) => {
  return all.then(cur)
}, Promise.resolve(10))

result.then(res => {
  console.log(res)
})