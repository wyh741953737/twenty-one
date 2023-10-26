// 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
// 输入：head = [1,2,3,4,5], n = 2 输出：[1,2,3,5]
var removeNthFromEnd = function(head, n) {
  let len = 0
  let cur = head
  while (cur) {
      len++
      cur = cur.next
  }
  let dummy = new ListNode(0, head)
  cur = dummy
  for (let i = 1; i < len - n + 1;i++) { // i要从1开始
    cur = cur.next
  }
  cur.next = cur.next.next
  return dummy.next
}