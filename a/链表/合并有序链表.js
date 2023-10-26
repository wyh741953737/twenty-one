// 合并两个有序链表，将2个升序链表合并成一个新的升序链表返回，新链表是通过拼接给定的两个链表所有节点组成
// 递归，
function mergeTwoList(l1, l2) {
  // if(l1 === null) {
  //   return l2
  // } else if(l2 === null) {
  //   return l1
  // } else if(l1.val < l2.val) {
  //   l1.next = mergeTwoList(l1.next, l2)
  //   return l1
  // } else {
  //   l2.next = mergeTwoList(l1, l2.next)
  //   return l2
  // }
  // let head = null
  // let tail = null
  // while(l1 && l2) {
  //   if(l1.val < l2.val) {
  //     if(head === null) {
  //       head = tail = l1
  //     } else {
  //       tail.next = l1
  //       tail = l1
  //     }
  //   } else {
  //     if(head === null ) {
  //       head = tail = l2
  //     } else {
  //       tail.next = l2
  //       tail = l2
  //     }
  //   }
  // }
  // return head
  if (l1 === null) return l2
  if (l2 === null) return l1
  let tail = (head = null)
  if (l1.val < l2.val) {
    tail = head = l1
    l1 = l1.next
  } else {
    tail = head = l2
    l2 = l2.next
  }
  while (l1 && l2) {
    if (l1.val < l2.val) {
      tail = l1
      l1 = l1.next
    } else {
      tail = l2
      l2 = l2.next
    }
  }
  if (l1) {
    tail = l1
  }
  if (l2) {
    tail = l2
  }
  return head
}
