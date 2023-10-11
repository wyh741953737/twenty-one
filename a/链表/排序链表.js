// 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
// 输入：head = [4,2,1,3]输出：[1,2,3,4]
// 输入：head = [-1,5,3,4,0]  输出：[-1,0,3,4,5]
const merge = (head1, head2) => {
  const dummyHead = new ListNode(0);
  let temp = dummyHead, temp1 = head1, temp2 = head2;
  while (temp1 !== null && temp2 !== null) {
      if (temp1.val <= temp2.val) {
          temp.next = temp1;
          temp1 = temp1.next;
      } else {
          temp.next = temp2;
          temp2 = temp2.next;
      }
      temp = temp.next;
  }
  if (temp1 !== null) {
      temp.next = temp1;
  } else if (temp2 !== null) {
      temp.next = temp2;
  }
  return dummyHead.next;
}
const findMid = head => {
  let slower = faster = head
  while(faster && faster.next) {
      slower = slower.next
      faster = faster.next.next
  }
  return slower
}
const toSortList = (head, tail) => {
  if (head === null) return head;
  if (head.next === tail) {
      head.next = null;
      return head;
  }
  const mid = findMid(head);
  return merge(toSortList(head, mid), toSortList(mid, tail));
}

var sortList = function(head) {
  return toSortList(head, null);
};



var sortList2 = function(head) {
  if (!head) return head
  let length = 0; // 先统计节点长度
  let node = head;
  while (node !== null) {
      length++;
      node = node.next;
  }
  const dummyHead = new ListNode(0, head);
  for (let subLength = 1; subLength < length; subLength <<= 1) { // 每次循环跳+2
      let prev = dummyHead, curr = dummyHead.next;
      while (curr !== null) {
          let head1 = curr;
          for (let i = 1; i < subLength && curr.next !== null; i++) {
              curr = curr.next;
          }
          let head2 = curr.next;
          curr.next = null;
          curr = head2;
          for (let i = 1; i < subLength && curr != null && curr.next !== null; i++) {
              curr = curr.next;
          }
          let next = null;
          if (curr !== null) {
              next = curr.next;
              curr.next = null;
          }
          const merged = merge(head1, head2);
          prev.next = merged;
          while (prev.next !== null) {
              prev = prev.next;
          }
          curr = next;
      }
  }
  return dummyHead.next;
};