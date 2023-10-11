/*
 * @Description: 
 * @Author: yourName
 * @Date: 2022-12-14 16:52:07
 * @LastEditors: wunihong
 * @LastEditTime: 2023-01-04 16:00:55
 */
// 给你一个由一些多米诺骨牌组成的列表 dominoes。
// 如果其中某一张多米诺骨牌可以通过旋转 0 度或 180 度得到另一张多米诺骨牌，我们就认为这两张牌是等价的。
// 形式上，dominoes[i] = [a, b] 和 dominoes[j] = [c, d] 等价的前提是 a==c 且 b==d，或是 a==d 且 b==c。
// 在 0 <= i < j < dominoes.length 的前提下，找出满足 dominoes[i] 和 dominoes[j] 等价的骨牌对 (i, j) 的数量。

const dominoes = [[1,2],[3,4],[5,6], [5,6], [3,1], [2,1]] // 12==12==21 [1,1,2,2] => [1,2] [1,2] => [1, 2] [2,1] => [2,1] [1,2] => [2,1] [2,1]
// 输出：1

// 1 <= dominoes.length <= 40000
// 1 <= dominoes[i][j] <= 9

function findDominoes(dominoes) {
  const map = new Array(100).fill(0)
  let ret = 0
  for(const domino of dominoes) {
    const val = domino[0] < domino[1] ? domino[0] * 10 + domino[1] : domino[1] * 10 + domino[0]
    ret += map[val]
    map[val]++
  }
  return ret
}

const res = findDominoes(dominoes)


// 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。
// 单词 指仅由字母组成、不包含任何空格字符的最大子字符串。
// 输入：s = "luffy is still joyboy"
// 输出：6
// 解释：最后一个单词是长度为6的“joyboy”。
const lengthOfLastWord = function(s) {
  // s = s.trim()
  // const arr = s.split(' ')
  // return arr[arr.length -1].length
  let end = s.length - 1;
  while(end >= 0 && s[end] == ' ') end--;
  if(end < 0) return 0;
  let start = end;
  while(start >= 0 && s[start] != ' ') start--;
  return end - start
}
// console.log(lengthOfLastWord('  hello   word   '))
// console.log(lengthOfLastWord('luffy  is still joyboy'))

// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
// 你可以按任意顺序返回答案。
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
const twoSum = function(nums, target, l=0, r=nums.length-1) {
  // for(let i = 1; i < nums.length; i++) {
  //   for(let j = i -1; j >= 0; j--) {
  //     if(nums[i] + nums[j] === target) {
  //       return [j ,i]
  //     }
  //   }
  // }
  let hashMap = new Map()
  for(let i = 0; i < nums.length; i++) {
    const rest = target - nums[i]
    if(hashMap.has(rest)) {
      return [hashMap.get(rest), i]
    } else {
      hashMap.set(nums[i], i)
    }
  }
}
// console.log(twoSum([2,7,11,15], 9))

// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。


// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
// 你返回所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
// 输入：nums = [-1,0,1,2,-1,-4] => 排序：[-4,-1,-1,0,1,2]
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。
const threeSum = function(nums) {
// 其中一个是负数，-1，另一个是0,1 || -2,3 || -3,4 ...
//               -2, 另一个是0,2 || -1, 3 || -3,5 => a+b = -c
// 其中一个是正数：1，另一个是-1,0 || -3,2, || -4,3 
  if(nums.length < 3) return []
  nums = nums.sort()
  if(nums[0] > 0 || nums[nums.length - 1] < 0) return []
  const n = nums.length
  const result = []
  // for(let i = 0; i < n; i++) {
  //   if(nums[i] > 0) return res
  //   if(i > 0 && nums[i] === nums[i - 1]) continue // 值一样跳过
  //   let l = i+1
  //   let r = n-1
  //   while(l < r) {
  //     const temp = nums[i] + nums[l] + nums[r]
  //     if(temp > 0) {
  //       r--
  //     }
  //     if(temp < 0) {
  //       l++
  //     }
  //     if(temp === 0) {
  //       res.push([nums[i], nums[l], nums[r]])
  //       while(l < r && nums[l] === nums[l+1]) {
  //         l++ // 跳过重复值
  //       }
  //       while(l < r && nums[r] === nums[r-1]) {
  //         r--
  //       }
  //     }
  //     l++
  //     r--
  //   }
  // }
  // return res
  // const n = nums.length
  // const res = []
  // for(let i = 0; i < n -2; ++i) {
  //   const x = nums[i]
  //   if(i > 0 && x === nums[i -1]) continue
  //   if(x + nums[i+1] + nums[i+2] > 0) break
  //   if(x + nums[n-2] + nums[n-1] < 0) continue
  //   let j = i+1
  //   let k = n-1
  //   while(j < k) {
  //     let s = x + nums[j] + nums[k]
  //     if(s > 0) --k
  //     else if(s < 0) ++j
  //     else {
  //       res.push([x, nums[j], nums[k]])
  //       for(++j; j < k && nums[j] === nums[j-1]; ++j);
  //       for(--k; k > j && nums[k] === nums[k+1]; --k);
  //     }
  //   }
  // }
  // return res
  for(let i = 0; i < nums.length-2; i++) {
    if(nums[i] > 0 || nums[i] + nums[i+1]+nums[i+2] > 0) return result
    if(i > 0 && nums[i] === nums[i - 1]) continue
    let l = i + 1
    let r = n - 1
    while(l < r) {
      const temp = nums[i] + nums[l] + nums[r]
      if(temp < 0) {
        l++
      }
      if(temp > 0) {
        r--
      }
      if(temp === 0) {
        result.push([nums[i], nums[l], nums[r]])
        while(l < r && nums[l] === nums[l+1]) {
          l++
        }
        while(l < r && nums[r] === nums[r-1]) {
          r--
        }
      }
      l++
      r--
    }
  }
  return result
};
const r1 = threeSum([-2,0,1,1,2])
const r2 = threeSum([-1,0,1,2,-1,-4])





// 输入：word1 = ["a", "cb"], word2 = ["ab", "c"]
// 输出：false

