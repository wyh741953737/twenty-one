import { transitionOptions } from "./utils"

const init = (options={}) => {
  const _options = {
    requestUrl: '', // 请求地址

    appName: '', // 应用名称
    appCode: '', // 应用code
    appVersion: '', // 应用地址

    ext: '', // 自定义全局附加参数
    debug: false, // 是否开启触发事件时控制台输出

    pvCore: false, // 页面跳转-是否自动发送页面跳转相关数据
    pvHashtag: false, // 页面跳转-浏览器的动作发生时（例如浏览器回退）是否监听hash变化。

    performanceCore: false, // 性能数据-是否采集静态资源，接口相关数据
    performanceFirstRecource: false, // 性能数据-是否采集首次进入页面的数据（tcp链接耗时，html加载完成时间，首次可交互时间）
    performanceServer: false, // 是否采集成功的接口请求

    errorCore: false, // 是否采集异常数据（资源引入错误，promise错误，控制台输出错误）
    errorServer: false, // 是否采集报错的接口请求

    eventCore: false, // 是否采集点击事件
    eventUnload: false // 是否在卸载时采集页面状态信息
  }
  // 初始化参数
  transitionOptions(_options, options)
  // 
  
}

const install = (Vue, options={}) => {
  init(options)
  if(Vue.prototype) {
    Vue.prototype.$trace = {}
  } else {
    Vue.config.globalPreperties.$trace = {}
  }
}


export default {
  install,
  init,
}