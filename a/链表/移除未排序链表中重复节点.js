// 编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。
// 输入：[1, 2, 3, 3, 2, 1]、输出：[1, 2, 3]
// 思路：关键在于未排序，保留最开始头结点，说明第一个节点不能被删除，有相同的删除后面的
const removeDuplicateNodes = head => {
  if(!head || !head.next) return head
  const newSet = newSet()
  newSet.add(head.val)
  let pos = head.next
  while(pos.next) {
    const save = pos.next
    if(newSet.has(save.val)) {
      pos.next = pos.next.next
    } else {  
      pos = pos.next
    }
  }
  return head
}