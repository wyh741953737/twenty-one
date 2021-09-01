import { FunctionComponent, HostComponent, IndeterminateComponent } from "./reactWorkTag";
import { renderWithHooks } from "./ReactFiberHooks";

export function beginWork(current, workInProgress) {
  switch (workInProgress.tag) {
    case IndeterminateComponent:
      return mountIndeterminateComponent(current, workInProgress, workInProgress.type);
    default:
      break;
  }
}

function mountIndeterminateComponent(current, workInProgress, Component) {
  // value就是Counter组件的返回值
  const children = renderWithHooks(current, workInProgress, Component);
  console.log(children)
  window.counter = children;
  workInProgress.tag = FunctionComponent;
  reconcileChildren(current, workInProgress, children)
    return workInProgress.child;
}

function reconcileChildren(current, workInProgress, children) {
  let childFiber = {
    tag: HostComponent,
    type: children.type
  }
  workInProgress.child = childFiber;
}