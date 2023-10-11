const DEVICE_KEY = '_device_id' // devicekey
const SESSION_KEY = '_session_id'
const SESSION_EXIT_TIME = 1800000 // session存活时长30min
const MAX_CACHE_COUNT = 5 // 最大缓存数
const MAX_WAITTING_TIME = 5000 // 最大等待时间
const DEEBUG_LOG = false  // 是否输出采集信息

export {
  DEVICE_KEY,
  SESSION_EXIT_TIME,
  SESSION_KEY,
  MAX_CACHE_COUNT,
  MAX_WAITTING_TIME,
  DEEBUG_LOG
}