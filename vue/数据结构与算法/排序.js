// 冒泡排序, 比较相邻元素，前面大于后面交换位置
const arr = [1,7,3,6,2,5,4]

function bubble(arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = 1; j < i; j++) {
      if(arr[i] < arr[j]) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  console.log(arr)
}
bubble(arr)