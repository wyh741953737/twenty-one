import compose from './compose'

// 函数是一个增强器，组合多个中间件，最终增强store.dispatch函数，dispatch时，可以串联执行所有中间件。
export default function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error('不允许在构建中间件时进行调度。其他中间件将不会应用于该dispatch')
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    }
    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}
