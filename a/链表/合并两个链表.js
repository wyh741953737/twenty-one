// 给你两个链表 list1 和 list2 ，它们包含的元素分别为 n 个和 m 个。
// 请你将 list1 中下标从 a 到 b 的全部节点都删除，并将list2 接在被删除节点的位置。
// 输入：list1 = [0,1,2,3,4,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]
// 输出：[0,1,2,1000000,1000001,1000002,5]
// 解释：我们删除 list1 中下标为 3 和 4 的两个节点，并将 list2 接在该位置。上图中蓝色的边和节点为答案链表。

// 输入：list1 = [0,1,2,3,4,5,6], a = 2, b = 5, list2 = [1000000,1000001,1000002,1000003,1000004]
// 输出：[0,1,1000000,1000001,1000002,1000003,1000004,6]

const mergeInBetween = function (list1, a, b, list2) {
  let preA = list1
  for (let i = 0; i < a - 1; i++) {
    preA = preA.next
  }
  let preB = preA
  for (let i = 0; i < b - a + 2; i++) {
    preB = preB.next
  }
  preA.next = list2
  while (list2.next) {
    list2 = list2.next
  }
  list2.next = preB
  return list1
}
