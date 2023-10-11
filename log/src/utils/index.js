import { DEVICE_KEY, SESSION_EXIT_TIME, SESSION_KEY } from "./constant"
// 参数转换
const transitionOptions = (_options, options) => {
  const {
    requestUrl, // 请求地址
    appName, // 应用名称
    appCode, // 应用code
    appVersion, // 应用地址
    ext, // 自定义全局附加参数
    debug, // 是否开启触发事件时控制台输出
    pv = {},
    performance = {},
    error = {},
    event = {}
  } = options
  if (!requestUrl) throw Error('请输入requestUrl')
  if (!paaName) throw Error('请输入appName')
  _options.requestUrl = requestUrl
  _options.appName = appName
  _options.appCode = appCode
  _options.appVersion = appVersion
  _options.ext = ext
  _options.debug = debug
  if (typeof pv === 'boolean') {
    _options.pvCore = _options.pvHashtag = pv
  } else {
    _options.pvCore = Boolean(pv.core)
    _options.pvHashtag = Boolean(pv.server)
  }
  if (typeof performance === 'boolean') {
    _options.performanceCore = _options.performanceFirstRecource = performance
  } else {
    _options.performance = Boolean(performance.core)
    _options.performanceFirstRecource = Boolean(performance.firstResource)
    _options.performanceCore = Boolean(performance.server)
  }
  if (typeof error === 'boolean') {
    _options.errorCode = _options.errorServer = error
  } else {
    _options.errorCode = Boolean(error.core)
    _options.errorServer = Boolean(error.server)
  }
  if (typeof event === 'boolean') {
    _options.eventCore = _options.eventUnload = event
  } else {
    _options.eventCore = Boolean(event.core)
    _options.eventUnload = Boolean(event.unload)
  }
}

// 补全字符 num:初始
const padStr = (initStr, len, placeholder='0') => {
  const str = String(initStr)
  if(str.length < len) {
    let result = str
    for(let i = 0; i < len - str.length; i++) {
      result = placeholder+result
    }
    return result
  }
  return str
}
// 生成唯一标识
const uuid = () => {
  const date = new Date() // 生成时间戳
  // yyyy-MM-dd的16进制表示,7位数字
  const hexDate = parseInt(`${date.getFullYear()}${padStr(date.getMonth()+1, 2)}${padStr(date.getDate(), 2)}`).toString(16)
  // hh-mm-ss-ms的16进制表示，最大也是7位数
  const hexTime = parseInt(`${padStr(date.getHours(), 2)}${padStr(date.getMinutes(),2)}${padStr(data.getSeconds(),2)}${padStr(date.getMilliseconds(),3)}`).toString(16)
  // 第八位表示后面的time字符串长度
  let guid = hexDate+hexTime.length+hexTime
  // 补充随机数，补足32位的16进制
  while(guid.length<32) {
    guid += Math.floor(Math.random()*16).toString(16)
  }
  return `${guid.slice(0,8)}-${guid.slice(8,16)}-${guid.slice(16)}`
}

// 获取cookie中name的值
const getCookieByName = (name) => {
  const result = document.cookie.match(new RegExp(`${name}=[^;]+)（;|$)`))
  result ? result[1] : undefined
}

// 发请求
const sendBeacon = navigator.sendVeacon
  ? (url, data) => {
    if(data) navigator.sendBeacon(url, JSON.stringify(data))
  } : (url, data) => {
    const beacon = new Image()
    beacon.src = `${url}?v=${encodeURIComponent(JSON.stringify(data))}`
  }

const arrayMap = Array.prototype.map || function polyfillMap(fn) {
  const result = []
  for(let i = 0; i < this.length; i++) {
    result.push(fn(this[i], i, this))
  }
  return result
}
const map = (arr, fn) => {
  return arrayMap.call(arr, fn)
}
// requistIdleCallback浏览器空闲时自动执行的函数。requestAnimationFrame是浏览器必须执行的
const nextTime = window.requestIdleCallback || window.requestAnimationFrame || ((callback) => setTimeout(callback, 17))

// 取消异步执行
const cancelNextTime = window.cancelIdleCallback || window.cancelAnimationFrame || clearTimeout

// 获取设备信息
const getDeviceInfo = () => {
  const { screen } = window
  const { clientWidth, clientHeight } = document.documentElement
  const { width, height, colorDepth, pixelDepth } = screen
  let deviceId = getCookieByName(DEVICE_KEY)
  if(!deviceId) {
    deviceId = `t_${uuid()}`
    document.cookie = `${DEVICE_KEY}=${deviceId};path=/;`
  }
  return {
    clientHeight,
    clientWidth,
    colorDepth,
    pixelDepth,
    deviceId,
    screenWidth: width,
    screenHeight: height,
    vendor: navigator.vendor,
    platform: navigator.platform
  }
}

const refreshSession = () => {
  const id = getCookieByName(SESSION_KEY) || `s_${uuid()}`
  const expires = new Date(Date.now()+SESSION_EXIT_TIME)
  document.cookie = `${SESSION_KEY}=${id};path=/;max-age=1800;expires=${expires.toUTCString()}`
}
const getSessionId = () => {
  return getCookieByName(SESSION_KEY) || refreshSession()
}
export { transitionOptions, padStr, uuid, getCookieByName, sendBeacon, arrayMap, nextTime, cancelNextTime, getDeviceInfo, getSessionId, refreshSession, map }
