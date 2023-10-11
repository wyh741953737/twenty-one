// 给定一个单链表 L 的头节点 head ，单链表 L 表示为：
//  L0 → L1 → … → Ln-1 → Ln
// 请将其重新排列后变为：
// L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …
// 输入: head = [1,2,3,4] 输出: [1,4,2,3]
// 输入: head = [1,2,3,4,5] 输出: [1,5,2,4
// 就是将末尾节点插入到第二个节点当中
// 寻找中间节点+链表逆序+合并链表
var reorderList = function (head) {
  const middleNode = head => {
    let slow = head
    let fast = head
    while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
    }
    return slow
  }

  const reverseList = head => {
    let prev = null
    let curr = head
    while (curr != null) {
      let nextTemp = curr.next
      curr.next = prev
      prev = curr
      curr = nextTemp
    }
    return prev
  }

  const merge = (l1, l2) => {
    if (!l1) return l2
    if (!l2) return l1
    let p1 = l1
    let p2 = l2
    const dumy = new ListNode(0)
    let temp = dumy
    while (p1 && p2) {
      const t1 = p1.next
      temp.next = p1
      p1.next = p2
      temp = p2
      p1 = t1
      p2 = p2.next
    }
    if (p1) {
      temp.next = p1
    }
    if (p2) {
      temp.next = p2
    }
    return temp.next
  }
  const mid = findMid(head)
  const reversedL1 = reverse(mid.next)
  mid.next = null
  return merge(head, reversedL1)
}

const reorderList2 = head => {
  if (head == null) return
  const list = new Set()
  let node = head
  while (node != null) {
    list.add(node)
    node = node.next
  }
  let i = 0,
    j = list.size() - 1
  while (i < j) {
    list.get(i).next = list.get(j)
    i++
    if (i == j) {
      break
    }
    list.get(j).next = list.get(i)
    j--
  }
  list.get(i).next = null
}
