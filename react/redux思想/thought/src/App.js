import React from 'react'
import { appContext, store, connect } from './redux';

const App = () => {
  return (
    <appContext.Provider value={store}>
      <FirstChild />
      <SecondChild/>
      <SmallistChild/>
    </appContext.Provider>
  )
}

const FirstChild = () => <section style={{color: 'red', width: '180px'}} >大儿子<User/></section>
const SecondChild = () => <section style={{border: '1px solid red',margin: '10px 0', width: '180px'}}>二儿子<UserModifer/></section>
const SmallistChild = () => <section style={{ color: 'pink', width: '180px' }}>小儿子</section>

const User = connect(({ state, dispatch }) => {
  return <div>User: {state.user.name}</div> 
})

const UserModifer = connect(({ dispatch, state, children }) => {
  console.log('--', state)
  const onChange = (e) => {
    dispatch({ type: 'updateUser', payload: { user: { name: e.target.value } } })
  }
  return <div style={{ margin: '10px 0' }}>
    {children}
    <input value={state.user.name} onChange={onChange}></input>
  </div>
});

export default App;