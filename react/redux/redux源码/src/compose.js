

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// ** 执行顺序是从右到左 
// 是函数式编程的一种形式，用于将多个函数合并，上一个函数的返回值作为当前函数的入参，当前函数的返回值作为下一个函数的入参，类似KOA洋葱模型
// [a,b,c,d] => a(b(c(d())))
