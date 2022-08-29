
import store from '../store/index'
import { sendAction } from '../store/actions'
import { useCallback, useState } from 'react'

function Home() {
  const [state, setState] = useState('状态')
  const handlerClick = () => {
    const action = sendAction()
    store.dispatch(action)
  }
  useCallback(() => {
    console.log('===useCallback')
    store.subscribe(() => {
      console.log('subscribe', store.getState())
    })
  }, [store])
  useCallback(() => {
    
  }, [])
  return (
    <div>
      <h1>我是react首页</h1>
      <button onClick={handlerClick}>发送请求</button>
      <h2>{store.getState().value}</h2>
      <h3>{state}</h3>
    </div>
  );
}

export default Home;
