import React, { useState, useEffect, useContext } from 'react'

export const store = {
  state: {
    user: {name: 'frank', age: 21}
  },
  setState(newState) {
    store.state = newState;
    store.listeners.map(fn => fn(store.state))
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    }
  }
}

// 规范state的更新，reducer（state, action)=>{switch}
const reducer = (state, action) => {
  if (action.type === 'updateUser') {
    return {
      ...state,
      ...action.payload
    }
  } else {
    return state
  }
}
export const connect = (Component) => {
  return (props) => {
    // hooks不能在函数外使用，所有用Wrapper包装一下UserModifer
    const { state, setState } = useContext(appContext);
    const [, update] = useState({});
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [])
    // dispatch规范setState流程
    const dispatch = (action) => {
      setState(reducer(state,action))
    }
    return <Component dispatch={dispatch} state={state} {...props} />
  }
}

export const appContext = React.createContext(null);
