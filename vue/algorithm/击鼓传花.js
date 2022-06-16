function passGame(nameList, num) {
  const queue = new Array()
  for(let i = 0; i < nameList.length; i++) {
    queue.push(nameList[i])
  }
  while(queue.size() > 1) {
    for(let i = 0; i < num - 1; i++) {
      queue.push(queue.splice(i, 1)) // 将删除项push到数组里
    }
  }
}


// 优先级
function PriorityQueue() {
  function QueueElement(element, priority) {
    this.element = element
    this.priority = priority
  }
  this.items = []
  PriorityQueue.prototype.enqueue = function(element, priority) {
    let queueElement = new QueueElement(element, priority)
    if(this.items.length === 0) {
      this.items.push(queueElement)
    } else {
      let added = false
      for(let i=0; i<this.items.length;i++) {
        if(queueElement.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement)
          added = true
          break
        }
      }
      if(!added) {
        this.items.push(queueElement)
      }
    }
  }
}