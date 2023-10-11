// 给你一个链表的头节点 head 。
// 对于列表中的每个节点 node ，如果其右侧存在一个具有 严格更大 值的节点，则移除 node 。
// 返回修改后链表的头节点 head 。
//  输入：head = [5,2,13,3,8] 输出：[13,8]
// - 节点 13 在节点 5 右侧。
// - 节点 13 在节点 2 右侧。
// - 节点 8 在节点 3 右侧。
// 思路：通过 反转链表，我们可以从反转后的链表头开始，删除比当前节点值小的元素。
// const reverseList = head => {
//   let pre = null
//   let cur = head
//   while (cur) {
//     const save = cur.next
//     cur.next = pre
//     pre = cur
//     cur = save
//   }
//   return pre
// }

// const removeNodes = head => {
//   let cur = head = reverseList(head)
//   while (cur.next) {
//     if (cur.val > cur.next.val) {
//       cur.next = cur.next.next
//     } else {
//       cur = cur.next
//     }
//   }
//   return reverseList(head)
// }

// 思路2：递归
const removeNodes = head => {
	if(!head.next) return head
	const node = removeNodes(head.next)
	if (node.Val > head.Val) { // 返回的链表头一定是最大的
		return node // 删除 head
	}
	head.next = node // 不删除 head
	return head
}