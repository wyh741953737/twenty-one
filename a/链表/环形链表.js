// 给你一个链表的头节点 head ，判断链表中是否有环。
// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）
// 注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
// 有环 ，返回 true 。 否则，返回 false 。
// 思路：快慢指针，慢的一次1步，快的一次2步，如果有环就会一直循环，没有环链表的next就会等于null
// 思路2：哈希表，遍历所有节点，每遍历一个节点就判断是否被访问过，如果已经存在说明访问过吗，有环
var hasCycle = function(head) {
  // if (head == null || head.next == null) {
  //         return false;
  //     }
  //     let slow = head;
  //     let fast = head.next;
  //     while (slow != fast) {
  //         if (fast == null || fast.next == null) {
  //             return false;
  //         }
  //         slow = slow.next;
  //         fast = fast.next.next;
  //     }
  //     return true;
  const hashList = new Set()
  while(head) {
    if(hashList.has(head)) {
      return true
    }
    hashList.add(head)
    head = head.next
  }
  return false
};