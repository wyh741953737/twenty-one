function createStore(reducer, preloadState, enchancer) {
  if (typeof preloadState === 'Function' && typeof enchancer === 'undefined') {
    enchancer = preloadState;
    preloadState = undefined;
  }
  let currentReducer = reducer;
  let currentState = preloadState;
  let currentListeners = [];
  let nextListeners = currentListeners; // 重要的设计
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentStete = currentReducer(currentState, action);
    const listeners = (currentListeners = nextListeners) // 确保当前的listeners是最新的
    for (let listener in listeners) {
      listener();
    }
    return action;
  }
  function subscription(listener) {
    if (nextListeners === currentListeners) {
      nextListeners = [...currentListeners]; // 浅复制，避免直接操作currentListeners
    }
    nextListeners.push(listener);
    return function unSubscription(listener) {
      if (nextListeners === currentListeners) {
        nextListeners = [...currentListeners] // 浅复制
       } 
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    }
  }
  dispatch({type: 'INIT'}) // 手动触发dispatch，初始化
  return {
    getState,
    dispatch,
    subscription
  }
}