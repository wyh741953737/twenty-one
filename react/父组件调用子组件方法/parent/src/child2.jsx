import React, { Component } from 'react'

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

class Child2 extends Component {
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }
  func() {
    console.log('执行props自定义onRef')
  }
  render() {
    return (
      <div>
        Child2
      </div>
    )
  }
}

HOC(Child2)
export default Child2
