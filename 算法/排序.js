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
// 在一个有序数组中找某个数最左侧的位置(用一个数往左移，二分)
// 局部最小值问题：无序数组，相邻数不一定相等（比如0,1之间最小是0， 4,2,3之间最小是2）
// [1,6,2,5,7,3] // 

// 对数器：有一个你想要测的方法a，实现复杂度不好，但是容易实现的方法b，实现一个随机样本产生器，吧方法a和方法b跑相同的随机样本，看结果是否一样，如果有一个随机样本使得对比结果不一致
// 打印样本进行人工干预，改对方法a或者方法b，当样本数量很多时比对测试依然正确，，可以确定方法a已经正确

// 用递归找出一个数组中最大值

// 右移一位相当于除2

// 求中间值：(L+R)/2 = L+(R-L)/2 = L+((R-L)>>1)
// 通过递归，二分，找出数组某个区间最大值
// 0-n-1之间求出最大值
function findMax(arr, l,r) {
  if(l===r) return arr[l]
  let mid = l+((r-l)>>1)
  const leftmax = findMax(arr, l, mid)
  const rightmax = findMax(arr, mid+1, r)
  return Math.max(leftmax, rightmax)
}