import { getAppChanges } from "../applications/app";
import { toLoadPromise } from "../lifeCycles/load";
import { toUnmountPromise } from "../lifeCycles/unmount";
import { started } from "../start";

export function reroute() {
  // 先获取需要加载的应用，再获取要挂载的应用，哪些要被卸载
  const [appsToLoad, appsToMount, appsToUnMount] = getAppChanges();

  if (started) {
    return performAppChanges() // 根据路径装载应用
  } else {
    // 调用registerApplication,要预加载
    return loadApps();
  }
  async function performAppChanges() {
    // 先卸载不需要的，再去加载需要的
    let unmountPromises = appsToUnMount.map(toUnmountPromise);
    appsToLoad.map(async (app) => {
      // 将需要加载的应用拿到，加载-启动-挂载
      app = await toLoadPromise(app);
      app = await toBootstrapPromise(app);
      return await toUnmountPromise(app);
    })
  }
  async function loadApps() {
    let apps = await Promise.all(appsToLoad.map(toLoadPromise)) // 获取bootstrap，mount，unmount方法放到app上

  }
}

