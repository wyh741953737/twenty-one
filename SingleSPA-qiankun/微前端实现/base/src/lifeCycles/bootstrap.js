import { BOOTSTRAPING, NOT_BOOTSTRAPED, NOT_MOUNT } from "../applications/app.helper";

export async function toBootstrapPromise(app) {
  if (app.status !== NOT_BOOTSTRAPED) {
    return app;
  }
  app.status = BOOTSTRAPING;
  await app.bootstrap(app.customProps);
  app.status = NOT_MOUNT;
  return app;
}