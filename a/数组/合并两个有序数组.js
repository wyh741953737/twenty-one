// 合并两个有序数组，给你两个按非递减顺序排列的整数数组num1和num2，另有2个整数m和n，分别表示num1和num2中的元素数目，请合并mun2到num1中，使合并后的数组同样安装非递减顺序排列
// 最终，合并后数组不应由函数返回，且是存储在数组num1中，为了应对这种情况，num1的初始长度为m+n，其中前m和元素表示应合并的元素，后n个元素为0，应忽略，num2的长度为n
// 输入num1=[1,2,3,0,0,0] m=3, num2=[2,5,6] n=3, 输出[1,2,2,3,5,6] // 需要合并[1,2,3]和[4,5,6]
// 输入num1=[1],m=1，num2=[],n=0 输出[1]
// 归并
function sortMeth(num1, num2, m, n) {
  let end1 = m - 1
  let end2 = n - 1
  let end = m + n - 1
  while (end1 >= 0 && end2 >= 0) {
    if (num1[end1] > num2[end2]) {
      num1[end--] = num1[end1--]
    } else {
      num1[end--] = num2[end2--]
    }
  }
  while (end2 >= 0) {
    num1[end--] = num2[end2--]
  }
  // console.log(num1)
}
sortMeth([1, 2, 3, 0, 0, 0], [2, 5, 6], 3, 3)
