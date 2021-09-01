let ReactCurrentDispatcher = { current: null };
let HookDispatchOnMount = {
  useReducer: mountReducer
}
let workInProgressHook = null;
let currentlyRenderingFiber = null;

export function useReducer(reducer, initialArg) {
  return ReactCurrentDispatcher.current.useReducer(reducer, initialArg)
}
export function renderWithHooks(current, workInProgress, Component) {
  currentlyRenderingFiber = workInProgress;
  ReactCurrentDispatcher.current = HookDispatchOnMount;
  // 核心：执行Component返回结果
  let children = Component(); // Component执行里面的代码，会遇到useReducer，就去执行usseReducer
  currentlyRenderingFiber = null;
  workInProgress = null;
  return children;
}

// 挂载
function mountReducer(reducer, initialArg) {
  let hook = mountWorkInProgressHook();
  hook.memoizedState = initialArg;
  const queue = (hook.queue = { pending: null });
  // bind会返回一个新的函数，fiber和queue每个hook的队列都不一样(声明2个useReduce第二个reducer的dispatch怎么找到自己的memorizedState？)
  const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue)
  return [hook.memoizedState, dispatch]
}
function dispatchAction(currentlyRenderingFiber, queue, action) {
  const update = { action, next: null }
  // 开始构建链表
  const pending = queue.pending;
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;
}

// 挂载当前执行
function mountWorkInProgressHook() {
  let hook = {
    memoizedState: null, // 自己的状态
    queue: null, // 自动的更新队列,环形链表
    next: null
  }
  if (workInProgressHook === null) { //说明是第一个hook
    // 会往workInProgress上面添加一个memorizedState属性
    currentlyRenderingFiber.memorizedState = workInProgressHook = hook;
  } else {
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}