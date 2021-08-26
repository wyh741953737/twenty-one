import { LOADING_SOURCE_CODE, NOT_BOOTSTRAPED } from "../applications/app.helper";

function flattenFnArray(fns) {
  fns = Array.isArray(fns) ? fns : [fns];
  return (props) => {
   // 多个方法组合成一个方法，通过promise链式来调用 
    return fns.reduce((p, fn) => p.then(()=> fn(props)), Promise.resolve())
  }
}
export async function toLoadPromise(app) {
  app.status = LOADING_SOURCE_CODE;
  let { bootstrap, mount, unmount } = await app.loadApp(app.customProps)
  app.status = NOT_BOOTSTRAPED; // 还没有调用bootstrap
  // 将多个promise组合

  app.bootstrap = flattenFnArray(bootstrap);
  app.mount = flattenFnArray(mount) ;
  app.unmount = flattenFnArray(unmount);
  return app;
}