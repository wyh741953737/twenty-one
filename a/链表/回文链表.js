// 链表的回文结构，1->2->-1就是回文结构
// 思路：快慢指针找到前半部分，然后反转后半部分，while循环后半部分，最后还原链表,
// 思路2：先用数组收集链表值，然后再用双指针一前一后向中间靠拢判断
function palindeList(head) {
  // // 反转链表
  // const reverseList = head => {
  //   let prev = null
  //   let curr = head
  //   while (curr !== null) {
  //     let nextTemp = curr.next
  //     curr.next = prev
  //     prev = curr
  //     curr = nextTemp
  //   }
  //   return prev
  // }
  // // 找到中间的
  // const endOfFirstHalf = head => {
  //   let fast = slow = head
  //   while (fast.next !== null && fast.next.next !== null) {
  //     fast = fast.next.next
  //     slow = slow.next
  //   }
  //   return slow
  // }
  // var isPalindrome = function (head) {
  //   if (head == null) return true
  //   // 找到前半部分链表的尾节点并反转后半部分链表
  //   const firstHalfEnd = endOfFirstHalf(head)
  //   const secondHalfStart = reverseList(firstHalfEnd.next)
  //   // 判断是否回文
  //   let p1 = head
  //   let p2 = secondHalfStart
  //   let result = true
  //   while (result && p2 != null) {
  //     if (p1.val != p2.val) result = false
  //     p1 = p1.next
  //     p2 = p2.next
  //   }
  //   // 还原链表并返回结果
  //   firstHalfEnd.next = reverseList(secondHalfStart)
  //   return result
  // }
  // 方法2 循环+双指针
  // const vals = []
  // while(head !== null) {
  //   vals.push(head.val)
  //   head = head.next
  // }
  // for(let i=0,j=vals.length-1;i<j;++i,--j) {
  //   if(vals[i] !== vals[j]) return false
  // }
  // return true
  // 方法3：递归，利用递归反向迭代节点，同时使用递归函数外的变量向前迭代，就可以判断链表是否是回文
  // currentNode 指针是先到尾节点，由于递归的特性再从后往前进行比较。
  let frontPointer
  const recursivelyCheck = currentNode => {
    if (currentNode !== null) {
      if (!recursivelyCheck(currentNode.next)) {
        return false
      }
      if (currentNode.val !== frontPointer.val) {
        return false
      }
      frontPointer = frontPointer.next
    }
    return true
  }
  var isPalindrome = function (head) {
    frontPointer = head
    return recursivelyCheck(head)
  }
}
