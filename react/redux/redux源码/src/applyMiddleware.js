import compose from './compose'

// 函数是一个增强器，组合多个中间件，最终增强store.dispatch函数，dispatch时，可以串联执行所有中间件。
export default function applyMiddleware(...middlewares) { // paalyMiddleware执行完后得到的是store里的方法和增强后的dispatch
  return (createStore) => (...args) => { // 在createStore里return enhancer(createStore)(reducer, preloadedState) args是reducer和preloadedState
    const store = createStore(...args) // 不会走enhancer(createStore)(reducer,proloadedState) 会走后面代码生成store对象
    let dispatch = () => {
      throw new Error('不允许在构建中间件时进行调度。其他中间件将不会应用于该dispatch')
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    }
    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch) // compose(...chain)得到的是loggerMiddleware执行后的 (next) => {} 函数
    // dispatch = (action) => { // 在这就把store的dispatch增强了，之后页面调用dispatch方法就会执行下面函数体内的内容
      // console.log('will dispatch', action)  
      // const returnValue = next(action) 
      // console.log('state after dispatch', getState())
      // return returnValue
    // }
    return {
      ...store,
      dispatch,
    }
  }
}

//每个middleware接收store的getState和dispatch做为参数，并返回一个函数。该函数会被传入被称为next的下一个middleware的disatch方法，并返回一个接收action的信函上，这个函数可以直接调用next(action)


// 这里的getState是从applyMiddleware里 const middlewareAPI = { getState: store.getState, dispatch: (...args) => dispatch(...args) } 解构出来的
function loggerMiddleware ({getState}) {
  return (next) => {
    return (action) => { // compose(...chain)之后再执行将store.dispatch传了进来，所以action是store.dispatch
      console.log('will dispatch', action)

      // 调用middleware链中下一个middleware的dispatch
      const returnValue = next(action)
      console.log('state after dispatch', getState())
      return returnValue
    }
  }
}

// const store = createStore(reducer, ['use redux'], applyMiddleware(loggerMiddleware))