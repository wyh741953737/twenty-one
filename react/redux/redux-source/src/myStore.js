

function createStore (reducer, initState, middleware) {
  let state = initState // 全局状态
  let subStr = [] // 订阅列表
  let reducers = reducer

  function getState () {
    return state
  }

  function dispatch (action) { // 接收一个action，将action交给reducer处理
    state = reducers(state, action) // 更改完状态后要通知订阅者
    subStr.forEach(sub => {
      sub()
    })
    return action
  }

  function addSub(fn) {
     subStr.push(fn)
  }

  let store =  {
    getState,
    dispatch,
    addSub
  }
  if(middleware) {
    middleware = [...middleware]
    middleware.reverse()
    middleware.forEach(mid => {
      store.dispatch = mid(store) // 中间件是对store.dispatch的增强
    })
  }
}

let initState = {
  count: 0
}
function initReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return state
  }
}

function logger(store) {
  let next = store.dispatch
  return (action) => { //  middleware.forEach(mid => { store.dispatch = mid(store) }) 执行完得到一个函数
    // 当你调用store.dispatch的时候会进行前置处理（console.log('log start'），next(action),后置处理(console.log('log end'))
    console.log('log start')
    let result = next(action) // next是向下执行的
    console.log('log end')
  } 
}
function logger2(store) {
  let next = store.dispatch
  return (action) => {
    console.log('log2 start')
    let result = next(action)
    console.log('log2 end')

  } 
}
// log start
// log2 start
// log2 end
// log end
const store = createStore(initReducer, initState, [logger, logger2])
const { getState, dispatch } = store

console.log(getState())
dispatch({
  type: 'ADD'
})