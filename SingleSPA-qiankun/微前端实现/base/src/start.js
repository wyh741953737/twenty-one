import { reroute } from "./navigations/reroute";

export let started = false; //是否启动过
export function start() {
  started = true;
  reroute(); // 需要挂载应用和加载
}