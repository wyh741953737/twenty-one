import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false

const callbacks = []
let pending = false

function flushCallbacks () { // 将callbacks中的回调执行一遍
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]() // copies[i]就是flushScheduleQueue
  }
}

//这里我们有使用微任务的异步延迟包装器。当状态在重新绘制之前更改时，它会有一些微妙的问题
//此外，在事件处理程序中使用（宏）任务会导致一些奇怪的行为， 所以我们现在到处都使用微任务。
let timerFunc

if (typeof Promise !== 'undefined' && isNative(Promise)) { // 做各个平台的promise兼容处理
  const p = Promise.resolve() // 通过resolve获取promise实例
  timerFunc = () => {
    p.then(flushCallbacks) // 异步的方式执行flushCallbacks
  //  在Web视图中，promise不会完全break，但它可能陷入一种奇怪的状态，回调被推到
//微任务队列，但在浏览器启动之前，不会刷新队列
//需要做一些其他工作，例如处理计时器。因此，我们可以通过添加空计时器“强制”刷新微任务队列。
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // promise不支持的时候使用MutationObserver
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 其他不支持使用定时器
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => { // 为了错误处理，这里封装了一层高阶函数，callbacks存放的就是我们想延后执行的回调
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) { // 如果没有处于挂载阶段
    pending = true
    timerFunc() // 异步执行callbacks中的任务
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
