import React, { Component } from 'react'

class Child extends Component {
  state = {
    age: 1
  }
  componentWillMount() {
    console.log('子组件执行componentWillMount')
  }
  componentDidMount () {
    console.log('子组件执行componentDidlMount')
  }
  componentWillReceiveProps () {
    console.log('子组件执行componentWillReceiveProps')
  }
  shouldComponentUpdate () {
    console.log('子组件执行shouldComponentUpdate')
    return true
  }
  componentDidUpdate () {
    console.log('子组件执行componentDidlUpdate')
  }
  componentWillUpdate () {
    console.log('子组件执行componentWillUpdate')
  }
  add = () => {
    const { age } = this.state
    this.setState({ age: age + 1 })
    console.log('----age')
  }
  render () {
    console.log('子组件执行render', this.props.count)
    return (
      <div>
        Child2-----
        <button onClick={this.add}>加</button>
        {this.state.age}
      </div>
    )
  }
}
export default Child
