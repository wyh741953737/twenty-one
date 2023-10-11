// 给定循环单调非递减列表中的一个点，写一个函数向这个列表中插入一个新元素 insertVal ，使这个列表仍然是循环升序的。
// 给定的可以是这个列表中任意一个顶点的指针，并不一定是这个列表中最小元素的指针。
// 如果有多个满足条件的插入位置，可以选择任意一个位置插入新的值，插入后整个列表仍然保持有序。
// 如果列表为空（给定的节点是 null），需要创建一个循环有序列表并返回这个节点。否则。请返回原先给定的节点。
// 输入：head = [3,4,1], insertVal = 2 输出：[3,4,1,2]
// 解释：在上图中，有一个包含三个元素的循环有序列表，你获得值为 3 的节点的指针，我们需要向表中插入元素 2 。新插入的节点应该在 1 和 3 之间，插入之后，整个列表如上图所示，最后返回节点 3 。

const insertVal = function (head, val) {
  const node = new Node(insertVal);
  if (!head) {
    // 当链表为空时，由于要返回的是一个循环列表，因此这个新创建的唯一节点的next指针需要指向自己。
    node.next = node
    return node
  }
  if (head.next === head) {
    head.next = node;
    node.next = head;
    return head;
}
  let cur = head
  let next = head.next
  while(next !== head) {
    if(val >= cur.val && val <= next.val) {
      // 介于链表某个值中间
      break
    }
    if(cur.val > next.val) {
      if(val >= cur.val || val < next.val) break 
    }
    cur = cur.next
    next = next.next
  }
  cur.next = node
  node.next = next
  return head
}
