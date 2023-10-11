import { getSessionId, uuid, sendBeacon, nextTime, getDeviceInfo, refreshSession} from "../utils";
import { version } from "../../package.json";
import { DEEBUG_LOG, MAX_CACHE_COUNT, MAX_WAITTING_TIME } from "../utils/constant";
const pageId = uuid() // 当前页面id，在整个页面生命周期内不变，单页应用路由变化也不会改变，加载sdk时创建一次

const sessionId = getSessionId() // 浏览器和后端的联系secssionID，和业务无关
let requestUrl = ''
let events = [] // 批次队列
let timer = null
const base = {
  ...getDeviceInfo(),
  pageId,
  sessionId,
  sdkVersion: version
}

const init = (options = {}) => {
  const { appName, appCode, ext } = options
  requestUrl = options.requestUrl
  base.appName = appName
  base.appCode = appCode
  base.ext = ext
}

// 收集埋点数据，sendImmediate是否立即发送
const emit = (e, sendImmediate=true) => {
  events = events.concat(e) // 追加到事件队列
  refreshSession() // 在cookie中添加session字段
  debug('接收到事件，等待发送', e)
  clearTimeout(timer) // 清除定时器
  events.length >= MAX_CACHE_COUNT || sendImmediate ? send() : timer = setTimeout(() => {
    send()
  }, MAX_WAITTING_TIME); // 如果事件收集到峰值或者需要立马发送，执行发送方法，否则开启定时器最大时间内收集事件
}

// 发送埋点信息
const send = () => {
  // 选取首部的部分分发送，performance会一次性采集大量数据追加到events中
  const sendEvents = events.slice(0, MAX_CACHE_COUNT) 
  
  debug('要发送事件', sendEvents)
  const time = new Date()
  sendBeacon(requestUrl, {
    baseInfo: {...base},
    eventInfo: map(sendEvents, (e) => {
      e.sendTime = time //设置发送时间
      if(e.eventType = 'click' || e.eventType === 'scroll' || e.eventType || e.eventType === 'submit' || e.eventType === 'change') {
        e.type = 'mix'
        return e
      }
      if(e.eventType === 'performance') {
        switch(e.eventId) { // 将性能进行分类，不同类型的性能数据差异较大，分开存放，资源，页面，请求
          case 'resource':
            e.type = 'resourcePerformance'
            break
          case 'page':
            e.type = 'pagePerformance'
          case 'server':
            e.type = 'serverPerformance'
            break
          default:
            break
        }
        e.type = e.eventType
        return e
      }
    })
  })
  if(events.length) nextTime(send)
}
const debug = (...args) => {
  if(DEEBUG_LOG) console.log(...args)
}
export {
  emit,
  init,
  debug
}