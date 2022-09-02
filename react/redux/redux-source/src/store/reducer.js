const initState = {
  value: '默认值',
  count: 0
}

const reducer = (state=initState, action) => {
  console.log('reducer', state, action)
  switch (action.type) {
    case 'send_type': 
     return Object.assign({}, state, action)
    case 'add_action':
      return { count: state.count+1 }
    case 'sendAction': {
      return { count: state.count+1 }
    }
    default:
      return state
  }
}

module.exports = {
  reducer
}