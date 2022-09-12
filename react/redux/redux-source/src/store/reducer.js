import { combineReducers } from "../reduxSource"

const reducer1 = (state=0, action) => {
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
const reducer2 = (state=1, action) => {
  console.log('reducer', state, action)
  switch (action.type) {
    case 'send_type': 
     return Object.assign({}, state, action)
    default:
      return state
  }
}

debugger
export default combineReducers({reducer1, reducer2})
