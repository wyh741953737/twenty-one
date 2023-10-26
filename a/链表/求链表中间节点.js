// 链表的中间节点，给定一个头结点为head的非空单链表，返回单链表的中间节点，如果有两个中间节点，则返回第二个中间节点
// 输入[1,2,3,4,5] 输出3，序列化形式[3,4,5]
// 思路：快慢指针，快的一次走2步，慢的一次走。1步时间O(N),空间O(1)
// 思路2：遍历2次链表，第一次统计链表元素个数n，第二次遍历循环条件k<Math.trunc(n/2) 时间O(N),空间O(1)
function findCenter(head) {
  let faster = (slower = head)
  while (faster && faster.next) {
    slower = slower.next
    faster = faster.next.next
  }
  return slower
}
