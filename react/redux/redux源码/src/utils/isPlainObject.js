// 判断obj的原型是不是Object
export default function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(obj) === proto
}

  // const O = function(){} 函数的时候是false
  // const O = new Function() // new Function 也是false
  // const O = {} // {}的时候是true
  // const O = { age: 1 } // {age: 1}的时候是true
  // const O = Object.create({age: 1}) // false
  // const O = new Object() // 不传|null|{}|{name: 'x'}都是true
  // console.log(Object.getPrototypeOf(B))
  // console.log(isPlainObject(O))

  // 总结：这个方法用来判断是否是对象{}或者new Object创建出来的对象