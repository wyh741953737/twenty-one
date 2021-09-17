import React, {Component, useImperativeHandle } from "react"

function HOC(Comp) {
  return function () {
    class Wrap extends Component {
      render() {
        return <Comp></Comp>
      }
    }
    return Wrap;
  }
}


const ChildImpro = props => {
  useImperativeHandle(props.onRef, () => {
    return {
      func
    }
  })
  function func() {
    console.log('useImproative')
  }
  return <div>子组件解决</div>
}

export default ChildImpro