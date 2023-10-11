// 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
// 输入：head = [1,3,2] 输出：[2,3,1]
const reversePrint = head => {
  // let arr = []
  //   while(head){
  //       arr.push(head.val);
  //       head = head.next;
  //   }
  //   return arr.reverse();
  // 思路2：递归,递归结束条件，为空数组
  if (!head) return []
  let result = reversePrint(head.next)
  result.push(head.val)
  return result
}
