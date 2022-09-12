import { legacy_createStore as createStore, applyMiddleware } from '../reduxSource'

import rootReducer from './reducer'

function M1 ({getState, dispatch}) {
  return (next) => {
    return (action) => {
      console.log('==dispatch===', dispatch)
      console.log('M1 开始')
      // 调用middleware链中下一个middleware的dispatch
      next(action)
      console.log('M1 结束')
    }
  }
}
function M2 ({getState}) {
  return (next) => {
    return (action) => {
      console.log('M2 开始')
      // 调用middleware链中下一个middleware的dispatch
      next(action)
      console.log('M2 结束')
    }
  }
}
function M3 ({getState}) {
  return (next) => {
    return (action) => {
      console.log('M3 开始')
      // 调用middleware链中下一个middleware的dispatch
      next(action)
      console.log('M3 结束')
    }
  }
}

const store = createStore(rootReducer, {}, applyMiddleware(M1, M2, M3))
store.dispatch({type: 'ADD'})
export default store