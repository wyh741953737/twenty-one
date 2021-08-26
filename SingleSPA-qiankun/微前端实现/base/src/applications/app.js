import { BOOTSTRAPING, LOADING_SOURCE_CODE, MOUNTED, NOT_BOOTSTRAPED, NOT_LOADED, NOT_MOUNT, shouldBeActive } from "./app.helper";

/**
 * 
 * @param {} appName 应用名字
 * @param {*} loadApp 加载的应用
 * @param {*} activeWhen 激活时候的回调
 * @param {*} customProps 自定义属性
 */
const apps = [];
export function registerApplication(appName, loadApp, activeWhen, customProps) {
  apps.push({
    name: appName,
    loadApp,
    activeWhen,
    customProps,
    status: NOT_LOADED
  })
  reroute() //加载应用
}

export function getAppChanges() {
  const appsToUnMount = []; // 要卸载的app
  const appsToLoad = []; //要加载的app
  const appsToMount = []; // 要挂载的app
  apps.forEach(app => {
    const appShouldBeActive = shouldBeActive(app);
    switch (app.status) {
      case NOT_LOADED:
      case LOADING_SOURCE_CODE: // 如果还没被加载，并且appShouldBeActive就将app，push到要加载的app数组
        if (appShouldBeActive) {
          appsToLoad.push(app);
        }
        break;
      case NOT_BOOTSTRAPED:
      case BOOTSTRAPING:
      case NOT_MOUNT:
        if (appShouldBeActive) {
          appsToMount.push(app);
        }
        break;
      case MOUNTED:
        if (!appShouldBeActive) {
          appsToUnMount.push(app)
        }
      default:
        break
    }
    return [appsToLoad, appsToMount, appsToUnMount]
  })
}