function LinkedList() {
  function Node(data) {
    this.data = data
    this.next = null
  }
  this.head = null
  this.length = 0
  LinkedList.prototype.append = function(data) {
    const newNode = new Node(data)
    if(this.length === 0) {
      this.head = newNode
    } else {
      let current = this.head
      while(current.next) { // 找最后一个节点，最后一个节点的next为当前节点
        current = current.next
      }
      current.next = newNode
    }
    this.length++
  }
  LinkedList.prototype.toString = function() {
    let current = this.head
    let str = ''
    while(current) {
      str += current.data+''
      current = current.next
    }
    return str
  }
  LinkedList.prototype.insert = function(position, data) {
    // 越界处理
    if(position < 0 || position > this.length) return false
    const newNode = new Node(data)
    if(position === 0) {
      this.head = newNode
    } else {
      let index = 0
      let current = this.head
      let previous = null
      while(index++ < position) {
        previous = current
        current = current.next
      }
      newNode.next = current
      previous.next = newNode
    }
    return true
  }
  LinkedList.prototype.get = function(position) {
    if(position < 0 || position >= this.length) return null
    let current = this.head
    let index = 0
    while(index++ < position) {
      current = current.next
    }
    return current.data
  }
  LinkedList.prototype.indexOf = function(data) {
    let current = this.head
    let index = 0
    while(current) {
      if(current.data === data) {
        return index
      }
      current = current.next
      index++
    }
    return -1
  }
  LinkedList.prototype.update = function(position, newData) {
    if(position < 0 || position >= this.length) return false
    let current = this.head
    let index= 0 
    while(index++ < position) {
      current = current.next
    }
    current.data = newData
    return true
  }
  LinkedList.prototype.remove = function(position) {
    if(position < 0 || position >= this.length) return null
    let current = this.head
    if(position === 0) {
      this.head = current.next
    } else {
      let index = 0
      let previous = null
      while(index++ < position) {
        previous = current
        current = current.next
      }
      previous.next = current.next
    }
  }
} 