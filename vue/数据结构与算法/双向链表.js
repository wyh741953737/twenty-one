// 单向链表：从头走到尾，回到上一个节点很难，只能从头走到尾，找到那个节点
// 双向链表双向的，要考虑四个引用，占用内存更大。pre，data，next三个部分组成

function DoublyLinkedList() {
  function Node(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
  this.head = null
  this.tail = null
  this.length = 0
  DoublyLinkedList.prototype.append = function (data) {
    const newNode = new Node(data)
    if(this.length === 0) { // 是第一个节点
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
  }
  DoublyLinkedList.prototype.toString = function() {
    return ''
  }
  DoublyLinkedList.prototype.forwardString = function() {
    let current = this.tail
    let result = ''
    while(current) {
      result += current.data + ''
      current = current.prev
    }
    return result
  }
  DoublyLinkedList.prototype.backwardString = function() {
    let current = this.head
    let result = ''
    while(current) {
      result += current.data + ''
      current = current.next
    }
    return result
  }
  DoublyLinkedList.prototype.insert = function(position, data) {
    if(position < 0 || position > this.length) return false
    const newNode = newNode(data)
    if(this.length === 0) { // 如果是第一个，将头尾都指向当前新节点
      this.head = newNode       
      this.tail = newNode
    } else {
      if(position === 0) { // 如果在链表头插入 
        this.head.prev = newNode
        newNode.next = this.head
      } else if(position === this.length) { // 如果在链表尾部插入
        newNode.prev = this.tail
        this.tail.next = newNode
        this.tail = newNode
      } else { // 在链表中间插入
        let current = this.head
        let index = 0
        while(index++ < position) {
          current = current.next
        }
        newNode.next = current
        newNode.prev = current.prev
        current.prev.next = newNode
        current.prev = newNode
      }
    }
    this.length++
  }

}

const list = new DoublyLinkedList()
list.append('a1')
list.append('b2')
list.append('c3')
list.append('d4')



console.log(list.backwardString())