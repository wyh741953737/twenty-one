// 旋转数组：给定一个数组，将数组中的元素向右移动k个位置，其中k是非负数
// 比如nums=[1,2,3,4,5,6,7] k=3 输出[5,6,7,1,2,3,4]
const nums = [1, 2, 3, 4, 5, 6, 7]
function revoteArr(arr, k) {
  const revert = (num, left, right) => {
    while (left < right) {
      let temp = num[left]
      num[left] = num[right]
      num[right] = temp
      ++left
      --right
    }
  }
  if (k >= arr.length) k %= arr.length - 1
  revert(arr, 0, arr.length - k - 1)
  revert(arr, arr.length - k, arr.length - 1)
  revert(arr, 0, arr.length - 1)
  return arr
}
