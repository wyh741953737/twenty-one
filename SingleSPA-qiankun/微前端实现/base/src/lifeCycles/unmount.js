import { MOUNTED, NOT_MOUNT, UNMOUNTING } from "../applications/app.helper";

export async function toUnmountPromise(app) {
  if (app.status !== MOUNTED) {// 如果还没挂载就不处理
    return app;
  }
  app.status = UNMOUNTING;
  await app.unmount(app.customProps)
  app.status = NOT_MOUNT;
  return app;
}