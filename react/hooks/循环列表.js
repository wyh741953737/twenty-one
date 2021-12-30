function dispatchAction(quque, action) {
  const update = { action, next: null };
  const pending = queue.pending;
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;
}
const queue = { pending: null };
dispatchAction(queue, 'action1');
dispatchAction(queue, 'action2');
dispatchAction(queue, 'action3');
