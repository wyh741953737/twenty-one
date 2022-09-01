import { legacy_createStore as createStore, applyMiddleware } from '../reduxSource'

import { reducer } from './reducer'

function M1 ({getState}) {
  return (next) => {
    return (action) => {
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

function reducers (state,action) {
  if(action.type === 'ADD') {
    console.log('======')
  }
  return {}
}
const store = createStore(reducers, {}, applyMiddleware(M1, M2, M3))
store.dispatch({type: 'ADD'})
export default store