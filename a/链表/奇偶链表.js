// 给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。
// 第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推。
// 请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。
// 你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题。
// 输入: head = [1,2,3,4,5] 输出: [1,3,5,2,4]
// 思路：
var oddEvenList = function(head) {
  if(head === null) return head
  let evenHead = head.next // 偶数头节点之后要拼接到奇数后面的
  let old = head // 奇数节点
  let even = evenHead // 偶数节点
  while(even !== null && even.next !== null) {  // 如果最后一个节点是偶数，则even.next=null，所以循环会到最后一个偶数节点的前一个节点...O->E->O 或者O->E->O->E
    old.next = even.next
    old = old.next
    even.next = old.next
    even = even.next
  }
  old.next = evenHead
  return head
}