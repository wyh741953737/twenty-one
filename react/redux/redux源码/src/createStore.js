import $$observable from './utils/symbol-observable'
import ActionTypes from './utils/actionTypes'
import { kindOf } from './utils/kindOf'

/**
 * **我们 推荐 使用`@reduxjs/toolkit`包中的 `configureStore`方法 , 它取代了“createStore”。
 * `configureStore` from Redux Toolkit is an 改进的版本 of `createStore` that
 * 简化 设置 并有助于避免常见错误。
 * `import { legacy_createStore as createStore} from 'redux'`
 *
 */
export function createStore(reducer, preloadedState, enhancer) { // reducer必须是函数，否则报错
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') { // enhancer必须是函数，否则报错
    return enhancer(createStore)(reducer, preloadedState)
  }

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false // 判断是否在执行dispatch里面的代码

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice() // 浅拷贝
    }
  }

  function getState() { // 典型的闭包
    if (isDispatching) {
      throw new Error('你不能在reducer执行的时候调用store.getState()')
    }
    return currentState
  }

  function subscribe(listener) { // 添加订阅的方法
    if (isDispatching) { // reducer函数是你自己实现的，如果在reduce里你调用dispatch一个action会进入一个死循环（action会执行reducer）
      throw new Error('你不能在reducer执行的时候调用store.subscribe()')
    }
    let isSubscribed = true // 表示正在监听

    ensureCanMutateNextListeners()
    nextListeners.push(listener)
    // 发布订阅有2种取消订阅方式，一种是将函数push进去，如果有2个相同的就将当前的删除，一种是返回一个取消订阅的函数
    return function unsubscribe() {
      if (!isSubscribed) { // 未监听直接返回
        return
      }
      if (isDispatching) {
        throw new Error('你不能在reducer执行的时候取消订阅')
      }
      isSubscribed = false
      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener) // 通过index找到然后删除
      nextListeners.splice(index, 1)
      currentListeners = null
    }
  }
  function dispatch(action) { // action必须是包含type的对象
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
    return action
  }

  function replaceReducer(nextReducer) { // nextReducer必须是函数，否则报错
    currentReducer = nextReducer

    //此操作的效果与ActionTypes.INIT类似。新的和旧的rootReducer中存在的任何reducer，将接收先前状态。这有效地填充了新状态树与旧状态树中的任何相关数据。
    dispatch({ type: ActionTypes.REPLACE })
  }

  function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * 观察器对象应具有“next”方法。
       */
      subscribe(observer) { // observer必须是对象
        function observeState() {
          if (observer.next) { // observer应该有next方法
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      },
    }
  }

  // 创建存储时，将调度“INIT”操作，以便每个reducer返回其初始状态。这有效地填充了初始状态树。
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable,
  }
}
export const legacy_createStore = createStore
