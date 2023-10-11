/*
 * @Description: 
 * @Author: yourName
 * @Date: 2022-12-27 14:04:15
 * @LastEditors: wunihong
 * @LastEditTime: 2022-12-28 14:19:04
 */
import { registerMicroApps, start, initGlobalState } from 'qiankun'
import store from './src/store/index'

async function getConfig() {
  let config = {}
  const localPath = process.env.NODE_ENV = 'development' ? '' : ''
  if(process.env.NODE_ENV === 'development') {
    config = ''
  } else {
    config = ''
  }
  return config
}

let actions = null
function globalState(status) {
  if(!actions) {
    actions = initGlobalState(status)
    actions.onGlobalStateChange((value, prev) => {
      console.log('主应用收到值的变化', value, prev)
    })
  } else {
    actions.setGlobalState(status)
  }
5222}
async function LoadingMicro() {
  await getConfig().then(res => {
    let apps = res.data.MICRO_APPS
    if(apps === undefined && apps.length < 1) return
    
    // 注册子应用
    registerMicroApps(apps, {
      beforeLoad: [
        function(app) {
          console.log('主应用beforeLoad', app.length)
        }
      ],
      beforeMount: [
        function(app) {
          let initState = {
            userId: store.getters.userId,
            token: store.getters.token,
            route: store.getters.routeList.filter(x => x.meta.code === app.code),
            code: app.name,
            role: []
          }
          globalState(initState)
        }
      ],
      afterMount:[
        function(apps) {
          console.log('afterMount', apps)
        }
      ]
    })
    start()
  })
}

export default LoadingMicro