import Home from './pages/home.jsx'
import Show from './pages/show.jsx'
import { Provider } from 'react-redux'
import store from './store'
import { useEffect } from 'react'

function App() {
  // useEffect(() => {
  //   function isPlainObject(obj) {
  //   if (typeof obj !== 'object' || obj === null) return false
  //   let proto = obj
  //   while (Object.getPrototypeOf(proto) !== null) {
  //     proto = Object.getPrototypeOf(proto)
  //   }
  //   console.log(Object.getPrototypeOf(obj), proto)
  //   return Object.getPrototypeOf(obj) === proto
  // }
  // // const O = function(){} 函数的时候是false
  // // const O = new Function() // new Function 也是false
  // // const O = {} // {}的时候是true
  // // const O = { age: 1 } // {age: 1}的时候是true
  // // const O = Object.create({age: 1}) // false
  // const O = new Object() // 不传|null|{}|{name: 'x'}都是true
  // // console.log(Object.getPrototypeOf(B))
  // console.log(isPlainObject(O))
  // }, [])
  useEffect(() => {
    // const myCompose = (f, g) => {
    //   return function(x) {
    //     return f(g(x))
    //   }
    // }
    // const add = x => x + 1
    // const multiply = y => y * 2
    // // 将乘2起来的结果做为参数传递到add函数里， 执行是从右到左
    // const fn1 = myCompose(add, multiply)
    // fn1(10)
    // const compose = function (...funcs) {
    //   // let args = [...arguments]
    //   // return function (x) {
    //   //   return args.reduceRight((res, cur) => {
    //   //     return cur(res)
    //   //   }, x)
    //   // }
    //   // return funcs.reduce((a, b) => (...args) => a(b(...args)))
    //   return funcs.reduce((a,b) => {
    //     return (...args) => {
    //       return a(b(...args))
    //     }
    //   })
    // }
    // const add = x => x + 1
    // const multiply = y => y * 2
    // // 将乘2起来的结果做为参数传递到add函数里， 执行是从右到左
    // const fn1 = compose(add, multiply)
    // console.log(fn1(10))
  }, [])
  return (
    <Provider store={store}>
      <Home />
      <Show />
    </Provider>
  );
}

export default App;
