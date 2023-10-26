// 给定两个单链表的头节点 headA 和 headB ，请找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
// 图示两个链表在节点 c1 开始相交：
// 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
// 输出：Intersected at '8'
// 思路1：有相交的话，先走自己的再走对方的肯定会有相同的，如果走到尽头都没相同的说明没有相交的，时间O(m+n)空间O(1)
var getIntersectionNode = function (headA, headB) {
  // if (headA === null || headB === null) {
  //     return null;
  // }
  // let pA = headA, pB = headB;
  // while (pA !== pB) {
  //     pA = pA === null ? headB : pA.next;
  //     pB = pB === null ? headA : pB.next;
  // }
  // return pA;
  // 思路2：哈希集合，先遍历链表A，将节点加入集合，然后遍历链表B，判断是否该节点在链表中，如果不在则下一个，如果在，则后面节点都在集合中
  const visited = new Set()
  let temp = headA
  while (temp !== null) {
    visited.add(temp)
    temp = temp.next
  }
  temp = headB
  while (temp !== null) {
    if (visited.has(temp)) {
      return temp
    }
    temp = temp.next
  }
  return null
}


