// 不使用任何内建的哈希表库设计一个哈希集合（HashSet）。
// 实现 MyHashSet 类：
// void add(key) 向哈希集合中插入值 key 。
// bool contains(key) 返回哈希集合中是否存在这个值 key 。
// void remove(key) 将给定值 key 从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。
//  输入：
// ["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
// [[], [1], [2], [1], [3], [2], [2], [2], [2]]
// 输出：
// [null, null, null, true, false, null, true, null, false]

// 解释：
// MyHashSet myHashSet = new MyHashSet();
// myHashSet.add(1);      // set = [1]
// myHashSet.add(2);      // set = [1, 2]
// myHashSet.contains(1); // 返回 True
// myHashSet.contains(3); // 返回 False ，（未找到）
// myHashSet.add(2);      // set = [1, 2]
// myHashSet.contains(2); // 返回 True
// myHashSet.remove(2);   // set = [1]
// myHashSet.contains(2); // 返回 False ，（已移除）

// 哈希函数：能够将集合中任意可能的元素映射到一个固定的整数值，并将该元素存储到整数值对应的地址上
// 冲突处理：不同元素可能映射到一个固定范围的整数值，可能会出现冲突
  // 解决冲突方法：链地址法：为每个哈希值维护一个链表，并将具有相同哈希值的元素都放入这一链表中
  // 开放地址法：当发现哈希值h产生冲突时，根据某种策略，从h出发找到下一个不冲突的位置，例如一种最简单的策略是，不断地检查h+1，h+2,h+3...这些整数对应的位置，
  // 再哈希法：当发现哈希冲突后，使用另一个哈希函数产生一个新地址
// 扩容：当哈希表元素过多产生冲突的概率越大，而在哈希表中查询一个元素的效率也越来越低，因此，需要开辟一快更大的空间来缓解哈希表中的冲突
// 链地址法：设计哈希表的大小为base，则可以设计一个简单的哈希函数：hash(x)=x mod base
  // 我们开辟一个大小为base的数组，数组的每个位置是一个链表，当计算出哈希值之后，就插入到对应的位置的链表中，由于我们使用整除法作为哈希函数，为了尽可能的避免冲突，应当将base取为一个质数比如769
// 时间复杂度O(n/b) n为哈希表中元素数量，b为链表数量。空间复杂度O(n+b)

// 整数a除以整数b刚好是整数没有余数，则a能被b整除，或者b能整除a，a成为b的倍数，b为a的约数。
// 公约数：一个整数同样是其他整数的约数，则这个整数就是其他整数的公约数。 公倍数：两个或以上的自然数中，如果有相同倍数，则这些倍数就是公倍数。
// 质数取模，其实是利用了同余的概念：当元素是个有规律的等差数列时，并且和基数（数组大小）最大公约数不为1时，就会造成哈希映射时冲突变高（数组某些位置永远不会有值）。比如数列0,6,12,18,24,30...，
// base为10，取模(0,6,2,8,4,0...)后，放入哈希表中位置将只能在0,2,4,6,8这几个数组位置上；
// 但我们如果把base取7（数组大小甚至比10小），同样数列取模后(0,6,5,4,3,2,1,0,...)，可以分布在哈希表中的0,1,2,3,4,5,6所有位置上；
// 后续：若x和y的最大公约为z，x和y的最小公倍数就为(x*y)/z，很明显，若z为1，也就是俩数的最大公约数为1的时候，那么俩数的最小公倍数就为x*y。
// 那么当一个数为质数时，除了其自身的倍数外，其余数和其的最大公约数都将是1，这时，步长选任何数（除了倍数）都可以满足桶的均匀分布。
// 所以，以取模计算哈希值在桶中的位置是，用一个质数当作基数时可以使得哈希表中每个位置都“有用武之地”。

// Hash表为什么需要使用mod素数？
// 从素数定理出发，我们可以知道素数有如下性质 ：任意一个大于1的自然数，要么本身就是质数，要么可以分解为几个质数之积，这种分解本身，具有唯一性*
// 在知道素数的性质后，回过头来看Hash表，我们将元素放在Hash表当中，需要解决的一个问题就是尽量解决冲突。
// 参考blog给出了一份实验，结论表明：模数的因子会影响数列的冲突，而且因子越多，冲突的可能性就越大。而素数的因子恰好只有1和其本身,就非常适合用于解决冲突。
// 比如 2 4 6 8 10 12这6个数，如果对 6 取余 得到 2 4 0 2 4 0 只会得到3种HASH值，6的因子有1，2，6。冲突会很多。如果对 7 取余 得到 2 4 6 1 3 5 得到6种HASH值，而7的因子只有1，7。
// 由3可知，即使1的因子最小，但是在实际中并不用，因为mod1相当于不解决冲突。而初始化的的数组就会非常大。
// Hash的用途很多，我们在使用Ngnix做负载均衡的时候，同样用的也是Hash的方式。总的来说，要是数据分布均匀一些，在这种时候就可以考虑使用Hash的方式对数据进行处理。

var MyHashSet = function() {
  this.BASE = 769 // 除了1和本身都不能被除尽的
  this.data = new Array(this.BASE).fill(0).map(() => new Array())
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
  const h = this.hash(key) // 取余数
  for(const element of this.data[h]) {
    if(element === key) {
      return
    }
  }
  this.data[h].push(key)
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
  const h = this.hash(key) // 取余数
  const it = this.data[h] // 余数相同的放到数组的同一个元素中
  for(let i = 0; i < it.length; ++i) {
    if(it[i] === key) {
      it.splice(i, 1)
      return
    }
  }
};

/** 
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
  const h = this.hash(key)
  for(const element of this.data[h]) {
    if(element === key) {
      return true
    }
  }
  return false
};
MyHashSet.prototype.hash = function(key) {
  return key % this.BASE; // 取余
}
/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */