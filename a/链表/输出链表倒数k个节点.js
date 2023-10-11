// 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。
// 例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。
//  1->2->3->4->5, 和 k = 2. 返回链表 4->5
// 思路：顺序查找，假设当前链表的长度为n，则链表的倒数第k个节点即为正数第n-k+1个节点，此时我们只需要顺序遍历完链表的
// 思路：快慢指针，当faster指向k+1，slow指向第1个，两者相差k个位置，faster先走k步，当faster指向Null时，slow刚好指倒数k个
function getKthFromEnd(head, k) {
  let n = 0
  let cur = head
  while (cur) {
    cur = cur.next
    n++
  }
  for (let i = 0; i < n - k; i++) {
    cur = cur.next
  }
  return cur
}
