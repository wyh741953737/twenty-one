const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => {
  return (WrapComponent) => {
    return class ConnectComponent extends React.Component {
      static contextTypes = {
        store: PropTypes.object
      }
      constructor(props, context) {
        super(props, context)
        this.state = {
          props: {}
        }
      }
      componentDidMount() {
        const { store } = this.context
        store.subscribe(() => this.update()) //订阅
        this.update()
      }
      update() {
        const { store } = this.context
        const stateProps = mapStateToProps(store.getState()) // mapStateToProps获取state
        const dispatchProps = mapDispatchToProps(store.dispatch)
        // 调用setState触发组件更新，将最新的state和dispatch合并更新到当前组件的props上
        this.setState({
          props: {
            ...this.state.props,
            ...stateProps,
            ...dispatchProps
          }
        })
        render() {
          return <WrapComponent {...this.state.props}></WrapComponent>
        }
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    value: state
  }
}