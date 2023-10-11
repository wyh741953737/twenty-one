// 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
// 输入：head = [1,2,3,4,5], k = 2 输出：[4,5,1,2,3]
// 思路：统计链表长度，然后重新计算要移动的距离k，之后使用快慢指针，快的先移动k，之后同时移动，如果快指针的next为null，就得到新指针的头结点
if (k === 0 || !head || !head.next) {
  return head
}
let n = 1 // 统计链表长度
let cur = head
while (cur.next) {
  cur = cur.next
  n++ 
}
let add = n - (k % n) // 如果k超出链表长度，将多余的循环删除
// 快指针先向前移动k步
// for(let i = 0; i < add; i++) {
//   fast= fast.next;
// }
// while (fast.next != null) {
//   fast = fast.next;
//   slow = slow.next;
// }
// fast.next = head;
// head = slow.next;
// slow.next = null;
// return head;
// 思路2：
if (add === n) { // 如果移动的位置等于节点长度相当于没移动
  return head
}
cur.next = head
while (add) {
  cur = cur.next
  add--
}

const ret = cur.next
cur.next = null
return ret
