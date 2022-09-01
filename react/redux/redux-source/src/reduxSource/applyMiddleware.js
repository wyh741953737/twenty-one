import compose from './compose'


export default function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    }
    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    const middle = compose(...chain) // f() { return(a(b(...arguments)))}
    // console.log(middle)
    dispatch = middle(store.dispatch) // a(b(store.dispatch)) // 
    // console.log(dispatch)
    return {
      ...store,
      dispatch,
    }
  }
}
