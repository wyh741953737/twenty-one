import {beginWork} from './reactFiberBeginWork';

let workInProgress = null;
export function render(fiber) {
  workInProgress = fiber;
  workLoop();
}

function workLoop() {
  while (workInProgress !== null) {
    workInProgress = performUnitOfEork(workInProgress);
  }
}

function performUnitOfEork(unitOfWork) {
  let current = unitOfWork.alternate;
  return beginWork(current, unitOfWork);
}
