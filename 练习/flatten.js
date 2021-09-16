const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e:5}
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3
}

// 得到{ 'a.b': 1, 'a.c': 2, 'a.b.c': 5, 'b[0]' :1, 'b[1]': 3, 'b[2].a': 2, 'b[2].b': 3, 'c': 3 }

function isObj(val) {
  return typeof val === 'object' && val !== null
}
function flatten(obj) {
  if (!isObj(obj)) return;
  let res = {}
  const dfs = (cur, prefix) => {
    if (isObj(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        })
      } else {
        for (let k in cur) {
          dfs(cur[k], `${prefix}${prefix ? '.' : ''}${k}`)
        }
      }
    } else {
      res[prefix] = cur;
   }
  }
  dfs(obj, '')
  return res
}