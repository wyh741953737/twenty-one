import React from 'react';
import { IndeterminateComponent } from './reactWorkTag';
import {render} from './reactFiberWorkloop';
import { useReducer } from './ReactFiberHooks';

const reducer = (state, action) => {
  if (action.type === 'add') {
    return state + 1;
  } else {
    return state;
  }
}
function Counter() {
  // const [number, setNumber] = React.useReducer(reducer, 0);
  const [number, setNumber] = useReducer(reducer, 0);

  return (
    <div onClick={() => setNumber({ type: 'add' })}>{number}</div>
  )
}

// 定义fiber结构
let conterFiber = {
  tag: IndeterminateComponent, // 函数组件初次渲染时是InterminateComponent
  type: Counter,
  alternate: null,

}

render(conterFiber);
