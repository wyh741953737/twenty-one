import React, { Component } from 'react'
import Child from './child'
import Child2 from './child2'
import ChildImpro from './ChildImpro'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.childRef = React.createRef();
    this.childRef2 = React.createRef();

  }
  handleClick() {
    // this.childRef.clickText();
    // console.log(this.childRef2.func())
    console.log(this.child.func())

  }

  render() {
    return (
      <div>
        <div>
          <div onClick={this.handleClick.bind(this)}>父组件</div>
          {/* 写法1：createRef */}
            <Child ref={this.childRef} />
          <br />
          {/* 写法2：声明式 */}
          <Child ref={node => this.childRef2 = node}></Child>
          
          <Child2 onRef={node => this.child = node} />
          
          <Parent />
        </div>
      </div>
    )
  }
}


const Parent = () => {
  let ChildRef = React.createRef();
  function handleC() {
    ChildRef.current.func()
  }
  return (
    <div>
      <button onClick={handleC}>点击</button>
      <ChildImpro onRef={ChildRef} />
    </div>
  )
}