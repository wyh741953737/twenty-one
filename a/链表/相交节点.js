// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
// 图示两个链表在节点 c1 开始相交
// 思路：假设A链表有m个节点，c个共同节点，不相交的有a个，B链表有n个节点，不相交的有b个
// 使用双指针分别遍历2个链表，当其中一个为null了换成对方的链表,指针1一共遍历a+c+b次，指针2遍历b+c+a次，最后两个指针指向的节点相同就是要返回的值
// 思路2：用哈希集合存链表节点，先遍历链表A将节点数据都存进去，然后遍历链表B，判断该节点是否在集合中，不在遍历下一个，在的haul后面节点都在几个中，就返回改节点
const getIntersectionNode = function(headA, headB) {
    // if(!headA || !headB) return null
    // let p1 = headA
    // let p2 = headB
    // while(p1.val !== p2.val) {
    //   p1 = p1 === null ? headB : p1.next
    //   p2 = p2 === null ? headA : p2.next
    // }
    // return p1
    // 方法2
    const visited = new Set()
    let tem = headA
    while(tem) {
      visited.add(tem)
      tem = tem.next
    }
    tem = headB
    while(tem) {
      if(visited.has(tem)) {
        return tem
      }
      tem = tem.next
    }
    return null
};