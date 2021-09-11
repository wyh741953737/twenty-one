export default class Provider extends React {
  // Provider就是通过React的contextAPI把数据往下传
  // context往所有子组件，孙组件里传数据
  // props 父组件往子组件传数据
  // state组件自身数据
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }
  getChildContext() {
    return { store: this.store };
  }
  render() {
    return React.Children.only(this.props.children)
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
}