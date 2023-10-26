// 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
// 输入：head = [1,2,3,3,4,4,5] 输出：[1,2,5]
// 输入：head = [1,1,1,2,3] 输出：[2,3]
// 链表是排好序的，重复的元素在链表中出现的位置是连续的，由于头节点可能会被删除，因此需要额外使用一个哑节点指向链表的头节点。
// 遇到这种需要将后面的也删除就要开启2个while循环了
var deleteDuplicates = function(head) {
  if (!head) return head;
  const dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next && cur.next.next) {
      if (cur.next.val === cur.next.next.val) {
          const x = cur.next.val;
          while (cur.next && cur.next.val === x) {
              cur.next = cur.next.next;
          } 
      } else {
          cur = cur.next;
      }
  }
  return dummy.next;
};