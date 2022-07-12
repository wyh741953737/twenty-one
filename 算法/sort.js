let arr = [9, 2, 7, 1, 5, 3, 8, 4, 6]

// 选择排序，选择第i个，遍历n轮，每次2个数进行交换
// 时间复杂度：O(n^2), 空间复杂度O(1)
function selectSort(arr) {
   if(arr.length < 2) return arr
   for(let i=0; i<arr.length; i++) {
     for(let j=i+1; j < arr.length; j++) {
      if(arr[i] > arr[j]) {
        swap(arr, i, j)
      }
     }
   }
   return arr
}
function selectSort2(arr) {
  for(let end = arr.length; end >0; end--) {
    let max = 0
    for(let begin = 1; begin <= end; begin++) {
      if(begin > end) {
        max = begin
      }
    }
    swap(max, end)
  }
}
// 冒泡排序 相邻两个比较，比较n-1轮，时间复杂度：O(n^2) 空间复杂度O(1)，稳定排序 
function bubbleSort(arr) {
   if(arr.length < 2) return arr
   for(let e = arr.length - 1; e > 0; e--) {
    let endIndex = 0
    for(let i = 0; i < e; i++) {
      if(arr[i] > arr[i+1]) {
        swap(arr, i, j)
        endIndex = i
      }
    }

   }
}

// 插入排序,时间复杂度O(n^2),空间复杂度O(1)
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

// 一个数组，其中一个数出现奇数次，其他都是偶数次，这个数是啥？用异或，循环每个数，如果异或为0，就是偶数次，异或不为0的取出来
const num = [1, 3, 3, 4, 4, 5, 5]
// 思想：同一批数，不管位置是啥的相异或偶数次相同的是0（可以视为出现次数是偶数的先异或得到0），最后异或的结果就是要取的值
function findNum(arr) {
  let target = 0
  for(let i = 0; i < arr.length; i++) {
    target = target ^ arr[i]
  }
  // console.log(target)
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


// 找出区间最大值
function process(arr, L, R) {
  if(L === R) return
  let mid = L+((R-L)>>1)
  process(arr, L, mid)
  process(arr, mid+1, R)
  merge(arr, L, mid, R)
}

// 归并排序：左边排序，右边排序，让整体有序,利用了外排序（两个指针），时间复杂度O(NlogN)空间复杂度O(N)
const mergeArr = [1,8,2,7,6,4,3,5]
//  区间：[2,7,6,4,3],L=2, R=6, M=4 => [2,3,4,6,7], L=[2,7,6], R=[4,3] 结果：[2,4,3,7,6]
function merge(arr, L, M, R) {
  let result = new Array(R-L+1)
  let i = 0
  let p1 = L
  let p2 = M+1
  while(p1 <= M && p2 <= R) {
    result[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++]
  }
  while(p1 <= M) {
    result[i++] = arr[p1++]
  }
  while(p2 <= R) {
    result[i++] = arr[p2++]
  }
  for(let i = 0; i < result.length; i++) {
    arr[L+i] = result[i]
  }
  return arr
}
// process(mergeArr, 2, 6)
// process函数是T(N) 子规模：2*(N/2) merge的时间复杂度是O(N) 符合master公式
// a=2,b=2,d=1 => logb^a=d  O(NlogN)
// 归并排序最后能变成O(NlogN)，没有浪费比较行为，选择，冒泡排序都浪费在了比较行为。

// 小和问题：在一个数组中，每个数左边比当前数小的累加起来叫做这个数组的小和，求一个数组的小和
// [1,3,4,2,5] => [1,1,3,1,1,3,4,2]
// [1,4,5,3,2] => [1,1,4,1,1]顺序不一样，最小和不一样
// 逆思维，求左边比当前数小的可以理解为右边比当前数大的，从左到右，R-p2+1个比当前数大的

// arr既要排好序也要求小和 
function mergeSum(arr, L, R) {
  if(L===R) return 0
  const mid = L+((R-L)>>1)
  // 左侧排好求小和的数量+右侧排好求小和数量+排好序后小和
  const left = mergeSum(arr, L, mid) 
  const right = mergeSum(arr, mid+1, R)
  const total =  mergeAdd(arr, L, mid, R)
  return left + right + total
}
function mergeAdd(arr, L, M , R) {
  const result = new Array(R-L+1)
  let i = 0
  let p1 = L
  let p2 = M+1
  let res = 0
  while(p1 <= M && p2 <= R) {
    res += arr[p1] < arr[p2] ? (R-p2+1) * arr[p1] : 0
    result[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]
  }
  while(p1 <= M) {
    result[i++] = arr[p1++]
  }
  while(p2 <= R) {
    result[i++] = arr[p2++]
  }  
  for(let i = 0; i < result.length; i++) {
    arr[L+i] = result[i]
  }
  console.log(res)
  return res
}
// mergeSum([1,3,4,2,5], 0, 4)
// 逆序对问题，在一个数组中，左边的数如果比右边的数大，则折两个数构成一个逆序对，请打印所有的逆序对
// 比如：32450 ==》 [3,2],[3,0],[2,0],[4,0], [5,0]


// 快排
// 1.0版本：拿最后一个数划分，小于等于的放在左边，右边·是大于的区域，
// 2.0版本，拿最后一个值划分，小于的放在左边，等于这个数的放中间，大于这个数的放右边，再把小于和大于的递归
// 3.0版本，随机选一个数，小于这个数放左边，等于这个数放中间，大于这个数放右边，再把小于区域和大于区域递归
function quickSort(arr, l, r) {
  if(l < r) {
    swap(arr, l+Math.random()*(r-l+1), r)
    let p = partition(arr, l, r)
    quickSort(arr, l, p[0]-1) // <区域
    quickSort(arr, p[1]+1, r) // >区域
  }
}
function partition(arr, l, r) {
  let less = l -1 // <右边界
  let more = r // >左边界
  while(l < more) {
    if(arr[l] < arr[r]) {
      swap(arr, ++less, l++)
    } else if(arr[l] > arr[r]) {
      swap(arr, --more, l)
    }
  }
  swap(arr, more, r)
  return [less+1, more]
}
// master公式
// T(N) = a*T(N/b)+O(N^d) 
// T(N)是母函数，a是次，T(N/b)是子过程，O(N^b)是除了子过程之外的代码
// 比如上面的函数，findMax是母函数，T(N), 递归调用自己的次数是2次，每次N/2次（子过程规模是N/2)，其他的代码执行是O(1) 所以T(N)=2*T(N/2)+O(1)
// 当b=2，d=0，a=2的时候，findMax函数满足master公式
// 满足以上条件的递归，时间复杂度

// 给定一个数组arr，和一个数num，请把小于等于num的数放左边，大于num的数放数组右边，要求空间复杂度O(1),时间复杂度O(N)
// i<=num，i和<=下一个数交换，<=右扩.[i]>num跳过，i++

// 给定一个数组arr，和一个数num，请把小于num的数放左边，等于num的放中间，大于num的数放数组右边，要求空间复杂度O(1),时间复杂度O(N)

// 堆结构：用数组实现的完全二叉树结构
// 完全二叉树：如果每棵子树的最大值都在顶部就是大根堆，如果每颗子树的最小值都在顶部就是小根堆。
// 完全二叉树：父：(i-1)/2, 左：2*i+1,右:2*i+2
function heapify(arr, index, heapSize) { // 时间复杂度：n*logn
  let left = index * 2 + 1 // 左下标
  while(left < heapSize) { // 左下标还有孩子
    let largest = left + 1 < heapSize && arr[left+1] > arr[left] ? left+1 : left // 两个孩子谁大，下标给谁
    largest = arr[largest] > arr[index] ? largest : index // 父和子谁大给谁
    if(largest === index) {
      break;
    }
    swap(arr, largest, index)
    index = largest
    left = index * 2 + 1
  }
}
// 堆排序:时间复杂度n*logn
function heapSort (arr) {
  // for(let i = 0; i < arr.length; i++) {
  //   heapInsert(arr, [i])
  // }
  // 也可以直接跳过
  let heapSize = arr.length
  swap(arr, 0, --heapSize)
  while(heapSize > 0) {
    heapify(arr, 0, heapSize)
    swap(arr, 0, --heapSize)
  }
}
function heapInsert(arr, index) { // 时间复杂度：n*logn
  while(arr[index] > arr[(index-1)/2]) {
    swap(arr, index, (index-1)/2)
    index = (index-1)/2
  }
}

// 已知一个几乎有序的数组，几乎有序是指：如果吧数组排好顺序，每个元素移动的距离不可超过k
// 并且k相对于数组来说比较小，请选择一个合适的排序算法针对这个数据进行排序
function sortedArrDistanceLess(arr, k) {
  let index = 0
  let result = []
  for(; index <= Math.min(arr.length, k); index++) {
    result.push(arr[index])
  }
  let i = 0
  for(; index < arr.length;i++,index++) {
    result.push(arr[index])
    arr[i] = result.pop()
  }
  while(!result.isEmpty()) {
    arr[i++] = result.pop()
  }
}

// 堆排序
function radixSort(arr, L, R, digit) {
  let radix = 10
  let i = 0;
  let j = 0
  let bucket = new Array(R-L+1)
  for(let d=1; d<=digit;d++) {
    
  }
}

// 查找缺失的数字：nums包含0到n的整数，缺失了一个请找出，比如[0,2,3] // 1
// 思路：0+1+2+..n - (a[0]+a[1]+a..[n]) 相减得到的结果就是缺失的
// 使用下标，数组中值是几，就在第几位置写值，缺失位置的就是值
// 给一个值x=0，x跟[0,n]所有值异或，x和数组中每个值异或，最后x就是缺失的数字。

// 旋转数组：给定一个数组，将数组中的元素向右移动k个位置，其中k是非负数 nums=[1,2,3,4,5,6,7] k=3 输出[5,6,7,1,2,3,4]
// 前n-k个数反转，后k个数反转，最后整体反转
// 当k等于n时相当于不旋转
function revert (arr, left, right) {
  while(left < right) {
    let temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
    ++left
    --right
  }
}
function rotate(nums, numSize, k) {
  if(k >= numSize) {
    k %= numSize
  }
  revert(nums, 0, numSize-1)
  revert(nums, numSize-k, numSize-1)
  revert(nums, 0, numSize-1)
}

// 线性表：具有相同特性元素的有限序列：顺序表、链表、栈、队列

// 寻找字符串中，连续重复最多的字符
// 'aaaaabbbbbbbbbbbcddd'
function findMaxStr(str) {
  let i = 0
  let j = 1
  let max = 0
  let maxStr = ''
  while(i < str.length-1) {
    if(str[i] !== str[j]) {
      if(j-i > max) {
        max = j-i
        maxStr = str[i]
      }
      i = j
    }
    j++
  }
}
// 斐波那契数列：递归重复，如何解决？
function fb1(n) {
  let cache = {}
  if(cache.hasOwnProperty(n)) {
    return cache[n]
  }
  let v = n===0 || n===1 ? 1 : fb1(n-1) + fb1(n-2)
  cache[n] = v
  return v
}
// 试将数组[1,2, [3,[4,5],6], 7, [8], 9] 变成 {children: [{value:1}, {value: 2}, {children: [{value: 3}, {children: [{value: 4}, {value: 5}]}, {value: 7}]}]}
function convert(arr) {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    if(typeof arr[i] === 'number') {
      result.push({value: arr[i]})
    } else if(Array.isArray(arr[i])) {
      result.push({
        children: convert(arr[i])
      })
    }
  }
}
// 映射实现上面的
function mapConvert(item) {
  // item可能是数组或者数字
  if(typeof item === 'number') {
    return {value: item}
  } else if(Array.isArray(item)) {
    return { children: item.map(_item => mapConvert(_item))} // 遇到什么都递归，上面的函数只有是数组才递归
  }
}
// 让3[abc]变成abcabcabc将3[2[a]a[b]]变成aabbaabbaabb
// 利用栈模拟：两个栈，遍历每个字符，如果这个字符是数字，将数字压栈a，将空字符串压栈b
// 如果字符是字母，将栈顶的这项改成字母。如果字符串是]那么将数字弹栈，将字符串栈的栈顶元素重复数字的次数，拼接到新的栈顶
function repeat(str, num) {
  let result = ''
  for(let i = 0; i < num; i++) {
    result += str
  }
  return result
}
function smartRepeat(str) {
  let stackNum = []
  let stackStr = []
  for(let i = 0; i < str.length; i++) {
    if(/\d/g.test(str[i])) {
      stackNum.push(str[i])
    } else if(str[i] === '[') {
      stackStr.push('')
    } else if(str[i] === ']') {
      const num = stackNum[stackNum.length-1]
      const str = stackStr[stackStr.length-1]
      const repeatStr = repeat(str, num)
      // 拼接到前面一个
      const preStr = stackStr[stackStr.length-2] || ''
      stackStr.pop()
      stackStr.splice(stackStr.length-1, 1, preStr + repeatStr)
      stackNum.pop()
    } else { // 字符是字母 ['', 'a']
      stackStr.splice(stackStr.length-1, 1, str[i])
    }
  }
  console.log(stackStr)
}
// smartRepeat("2[3[b]2[c]]1[m]")