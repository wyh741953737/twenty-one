// 给你一个链表的头节点 head ，该链表包含由 0 分隔开的一连串整数。链表的 开端 和 末尾 的节点都满足 Node.val == 0 。
// 对于每两个相邻的 0 ，请你将它们之间的所有节点合并成一个节点，其值是所有已合并节点的值之和。然后将所有 0 移除，修改后的链表不应该含有任何 0 。
//  返回修改后链表的头节点 head 。
// 输入：head = [0,3,1,0,4,5,2,0] 输出：[4,11]
// 思路：关键在于将得到的非0节点创建一个新节点
const mergeNode = function (head) {
    // 思路1：用一个total收集总和，根据总和创建新节点，创建完重置total
    // let dummy = new ListNode(0)
    // let tail = dummy
    // let total = 0
    // let cur = head.next
    // while(cur) {
    //     if(cur.val === 0) {
    //         // 等于0的时候将前面收集的total创建一个新的节点
    //         let node = new ListNode(total)
    //         tail.next = node
    //         tail = tail.next
    //         total = 0
    //     } else {
    //         total += cur.val
    //     }
    //     cur = cur.next
    // }
    // return dummy.next
     // 思路2：使用一个指针，指向当前链表的下一个节点
     head = head.next
     let prev = head
     while (prev && prev.next) {
         if (prev.next.val !== 0) {
             prev.val += prev.next.val
             prev.next = prev.next.next
         } else {
             prev.next = prev.next.next
             prev = prev.next
         }
     }
     return head
}