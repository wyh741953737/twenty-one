import { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'

function Home() {
  const [state, setState] = useState('状态')
  const handlerClick = () => {
    console.log(this)
    
  }
  useEffect(() => {
  }, [])
  useCallback(() => {

  }, [])
  return (
    <div>
      <h1>我是react首页</h1>
      <button onClick={handlerClick}>加</button>
      <h3>{state}</h3>
    </div>
  );
}

// mapstatetoprops将store数据做为peops绑定到组件，state是redux的stroe，ownProps自己的props
// mapdispatchtoProps将action作为props绑定到组件，dispatch就是store.dispatch
// mergeProps,通常不用，redux会用Object.assign合并
// A是发送方，实现第二个参数
const mapDispatchToProps = (dispatch) => {
  return {
    sendAction: () => {
      dispatch({
        type: 'add_action'
      })
    }
  }
}
export default connect(null, mapDispatchToProps)(Home);
