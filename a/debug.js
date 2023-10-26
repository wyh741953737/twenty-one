/*
 * @Description:
 * @Author: yourName
 * @Date: 2022-12-15 16:04:53
 * @LastEditors: wunihong
 * @LastEditTime: 2023-01-11 10:32:11
 */
const threeSum = function (nums) {
  if (nums.length < 3) return []
  nums = nums.sort()
  if (nums[0] > 0 || nums[nums.length - 1] < 0) return []
  const n = nums.length
  const result = []
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0 || nums[i] + nums[i + 1] + nums[i + 2] > 0) return result
    if (i > 0 && nums[i] === nums[i - 1]) continue
    let l = i + 1
    let r = n - 1
    while (l < r) {
      const temp = nums[i] + nums[l] + nums[r]
      if (temp < 0) {
        l++
      }
      if (temp > 0) {
        r--
      }
      if (temp === 0) {
        result.push([nums[i], nums[l], nums[r]])
        while (l < r && nums[l] === nums[l + 1]) {
          l++
        }
        while (l < r && nums[r] === nums[r - 1]) {
          r--
        }
      }
    }
  }
  return result
}
// const r2 = threeSum([-1,0,1,2,-1,-4])
//                    0,1,2,3,4,5

// 示例
async function fn() {
  try {
    await new Promise((resolve, reject) => {
      reject('failure');
    });
  } catch(e) {
  }
  console.log('do something...');
}
// fn()


const word1  = ["jrrtrtsmedcqwzpveyacqdnbontepfgederi","xwxnkdz","xzqhs","puo","lzccsht"]
const word2 = ["jrrtrtsmedcqwzpveyacqdnbontepfgederi","xwxnk","hckdapkmpybjourjk"]
// 输出：true

var arrayStringsAreEqual = function(word1, word2) {
  let p1 = 0, p2 = 0, l = 0, r = 0
  while(p1 < word1.length && p2 < word2.length) {
    if(word1[p1][l] !== word2[p2][r]) {
      return false
    }
    l++
    if(l === word1[p1].length) {
      p1++
      l = 0
    }
    r++
    if(r === word2[p2].length) {
      p2++
      r = 0
    }
  }
  return p1 === word1.length && p2 === word2.length
};
const res = arrayStringsAreEqual(word1, word2)
// console.log(res)

var isPalindrome = function(x) {
  // x = String(x)
  // let l = 0
  // let r = x.length - 1
  // console.log('000', l, r)
  // while(l < r && r > l) {
  //     console.log(x[l], x[r])
  //     if(x[l] !== x[r]) {
  //         return false
  //     }
  //     l++
  //     r--
  // }
  // return 
  if(x < 0 || (x%10===0 && x !== 0)) {
    return false
  }
  // let revertNum = 0
  // while(x > revertNum) {
  //   revertNum = revertNum * 10 + x % 10
  //   x = Math.floor(x/10) // 取十位的整数 121/10=12   234/10=23
  // }
  // return x === revertNum || x === Math.floor(revertNum / 10)
  let revertNum = ''
  let startX = x
  while(String(x).length !== 1) {
    revertNum = String(revertNum) + (x % 10)
    x = Math.floor(x/10)
  }
  console.log(String(revertNum)+x, startX)
  return String(revertNum)+x === String(startX)
};

console.log(isPalindrome(121))