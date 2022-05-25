//  data = [
//    { name: '小铭', hobbies: ['唱歌', '跳舞']},
//    { name: '小红', hobbies: ['学习', '跳舞'] }
//  ]
//  keyName: person.name  keys: ['person', 'age']
// data: { person: {name: '小明', age: 12 } }
export default function lookup(dataObj, keyName) {
  console.log('lookup接受到的数据', dataObj, keyName)
  // 区分dataObj是数组还是对象
  if(keyName.indexOf('.') > 1) {
    let keys = keyName.split('.')
    let temp = dataObj
    for(let i = 0; i < keys.length; i++) {
      temp = temp[keys[i]]
    }
    return temp
  }
  if(Object.prototype.toString.call(dataObj) === '[object Object]') {
    return dataObj[keyName]
  }
  return dataObj
}

// 测试revert
