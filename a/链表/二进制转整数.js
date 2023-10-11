// 给你一个单链表的引用结点 head。链表中每个结点的值不是 0 就是 1。已知此链表是一个整数数字的二进制表示形式。
// 请你返回该链表所表示数字的 十进制值
// 输入：head = [1,0,1] 输出：5
// 思路：每次遍历都认为当前是最后一位，将结果乘以2再加当前值
// 二进制转换为十进制的两种方式：第一种是从后往前按权展开，第二种是从高位开始每次*2再加后一项，这样高位相当于一次一次被乘，权重还是一样的
const getDecimalValue = head => {
  let curNode = head
  let ans = 0
  while (curNode != null) {
    ans = ans * 2 + curNode.val
    curNode = curNode.next
  }
  return ans
}
