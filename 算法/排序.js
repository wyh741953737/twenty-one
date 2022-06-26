let arr = [9, 2, 7, 1, 5, 3, 8, 4, 6]

// 选择排序，选择第i个，遍历n轮，每次2个数进行交换
// 时间复杂度：O(n^2), 空间复杂度O(1)
function selectSort(arr) {
   if(arr.length < 2) {
    return arr
   }
   for(let i=0; i<arr.length; i++) {
     for(let j=i+1; j < arr.length; j++) {
      if(arr[i] > arr[j]) {
        swap(arr, i, j)
      }
     }
   }
   return arr
}

// 冒泡排序 相邻两个比较，比较n-1轮，
function bubbleSort(arr) {
  if(arr.length < 2) {
    return arr 
   }
   for(let e = arr.length - 1; e > 0; e--) {
    for(let i = 0; i < e; i++) {
      if(arr[i] > arr[i+1]) {
        swap(arr, i, j)
      }
    }
   }
}

// 插入排序
function insertSort (arr) {
  if(arr.length < 2) return arr
  for(let i = 1; i < arr.length; i++) { // 0-i做到有序
    for(let j = i - 1; j >= 0 && arr[j] > arr[j+1]; j--) {
      swap(arr, j, j+1)
    } 
  }
}
function swap(arr, i, j) {
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[i] ^ arr[j] // a ^ b ^ b = a ===> b = a
  arr[i] = arr[i] ^ arr[j] // a ^ a ^ b = b ===> a = b
}

selectSort(arr)

// 一个数组，其中一个数出现奇数次，其他都是偶数次，这个数是啥？用异或，循环每个数，如果异或为0，就是偶数次，异或不为0的取出来
const num = [1, 3, 3, 4, 4, 5, 5]
// 思想：同一批数，不管位置是啥的相异或偶数次相同的是0（可以视为出现次数是偶数的先异或得到0），最后异或的结果就是要取的值
function findNum(arr) {
  let target = 0
  for(let i = 0; i < arr.length; i++) {
    target = target ^ arr[i]
  }
  console.log(target)
}
findNum(num)
// 异或和某一位上1的个数有关，和顺序无关，偶数个为0，奇数个为1

// 同一个数组，2个数出现奇数次，其余都是偶数次，找出这两个数，
// 得到得到结果是a^b的值，并且a!=0,b!=0,a!=b
function findTwoNum(arr) {
  let eor = 0
  for(let i = 0; i < arr.length; i++) {
    eor ^= arr[i]
  }
  // eor=a^b, eor!=0, eor上必然有一个位置是1,（相同为0，不同为1)
  let rightOne = eor & (~ero+1) // 取出eor最右的不等于0的数也就是1
  let onlyOne = 0
  for(let i = 0; i < arr.length; i++) {
    if((arr[i] & rightOne) === 0) {
      onlyOne ^= arr[i]
    }
  }
  return onlyOne
}

// 在一个有序数组中找一个数是否存在？二分
 