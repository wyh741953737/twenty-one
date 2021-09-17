import React, { Component } from 'react'

export default class Child extends Component {
  func() {
    console.log('子组件方法')
  }
  render() {
    return (
      <div>
        我是子组件
      </div>
    )
  }
}
