// 链表分割
// 给你一个链表的头结点head和一个特定值x，请你对链表进行分割使得所有小于x的节点都出现在大于或者等于x的节点之前，你不需要保留每个分区中各节点的初始相对位置
// 输入head=[1,4,3,2,5,2] x=3 输出[1,2,2,4,3,5] 输入head=[2,1] x=2 输出[1,2]
function partition(head, x) {
  let small = new listNode(0)
  let large = new listNode(0)
  let smallHead = small
  let largeHead = large
  while (head) {
    if (head.val < x) {
      small.next = head
      small = small.next
    } else {
      large.next = head
      large = large.next
    }
    head = head.next
  }
  large.next = null
  small.next = largeHead.next
  return smallHead.next
}
