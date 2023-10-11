// 反转链表，给你单链表的头结点head，请你反转链表并返回反转后的链表
// 1->2->->4->5  输出5->4->3->2->1
// 输入head=[1,2,3,4,5] 输出：[5,4,3,2,1]
function reverseList(head) {
  // head：{data:'1',next: x}
  let pre = null
  let cur = head
  while (cur !== null) {
    let curNext = cur.next
    cur.next = pre
    pre = cur
    cur = curNext
  }
  return pre
}
