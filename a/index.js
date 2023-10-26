/*
 * @Description: 
 * @Author: yourName
 * @Date: 2022-11-29 16:58:22
 * @LastEditors: wunihong
 * @LastEditTime: 2022-12-14 16:52:03
 */
// 给你一个由一些多米诺骨牌组成的列表 dominoes。
// 如果其中某一张多米诺骨牌可以通过旋转 0 度或 180 度得到另一张多米诺骨牌，我们就认为这两张牌是等价的。
// 形式上，dominoes[i] = [a, b] 和 dominoes[j] = [c, d] 等价的前提是 a==c 且 b==d，或是 a==d 且 b==c。
// 在 0 <= i < j < dominoes.length 的前提下，找出满足 dominoes[i] 和 dominoes[j] 等价的骨牌对 (i, j) 的数量。

const dominoes = [[1,2],[3,4],[5,6], [5,3], [11,1], [21,1]] // [1,1,2,2] => [1,2] [1,2] => [1, 2] [2,1] => [2,1] [1,2] => [2,1] [2,1]
// 输出：1

// 1 <= dominoes.length <= 40000
// 1 <= dominoes[i][j] <= 9

function findDominoes(dominoes) {
  let count = 0
    for(let i = 0; i < dominoes.length; i++) {
      const arr1 = dominoes[i]
      for(let j = i + 1; j < dominoes.length; j++) {
        const arr2 = dominoes[j]
        let map = []
        if(arr1[0] === arr1[1] && arr2[1] === arr2[0]) { // [1,1]和[1,1]
          if(arr1[0] === arr2[0]) {
            count += 1
          }
        } else {
          const newArr = [...arr1, ...arr2]
          for(let i = 0; i < newArr.length; i++) {
            const index = map.indexOf(newArr[i])
            if(index > -1) {
              map.splice(index, 1)
            } else {
              map.push(newArr[i])
            }
          }
          if(map.length === 0) {
            count += 1
          }
        }
      }
    }
    console.log(count)
    return count
}

findDominoes(dominoes)

