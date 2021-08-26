// 描述应用整个状态
export const NOT_LOADED = 'NOTLOADED'; // 应用初始状态
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE'; //加载资源
export const NOT_BOOTSTRAPED = 'NOT_BOOTSTRAPED'; // 还没调用bootstrap
export const BOOTSTRAPING = 'BOOTSTRAPING'; // 启动中
export const NOT_MOUNT = 'NOT_MOUNT'; // 还没调用mount
export const MOUNTING = 'MOUNTING'; // 正在挂载
export const MOUNTED = 'MOUNTED';  // 挂载完成
export const UPDATING = 'UPDATING'; // 更新中
export const UNMOUNTING = 'UNMOUNTING'; // 卸载中
export const UNMOUNTED = 'UNMOUNTED'; // 卸载完成
export const LOAD_ERR = 'LOAD_ERR'; // 加载错误
export const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN'; // 


// 当前是否被激活
export function isActive(app) {
  return app.status === MOUNTED
}
// 当前应用是否要被激活
export function shouldBeActive(app) {
  return app.activeWhen(window.location)
}