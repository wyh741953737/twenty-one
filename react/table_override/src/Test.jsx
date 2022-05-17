import React, { Component } from 'react'
import Child from './child'
class GroupManage extends Component {
  state = {
    count: 0
  }
  componentWillMount () {
    console.log('父组件执行componentWillMount')
  }
  componentDidMount () {
    console.log('父组件执行componentDidlMount')
  }
  componentWillReceiveProps () {
    console.log('父组件执行componentWillReceiveProps')
  }
  shouldComponentUpdate () {
    console.log('父组件执行shouldComponentUpdate')
    return true
  }
  componentWillUpdate() {
    console.log('父组件执行componentWillUpdate')
  }
  componentDidUpdate () {
    console.log('父组件执行componentDidlUpdate')
  }
  add = () => {
    const { count } = this.state
    this.setState({ count: count + 1 })
    console.log('----add')
  }
  render () {
    console.log('-------父组件render')
    return (
      <div>
        <button onClick={this.add}>加</button>
        <Child />
      </div>
    )
  }
}
export default GroupManage
