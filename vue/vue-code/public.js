// 观察者模式
// 定义一个猎人，具有发布，订阅功能，其中订阅列表来记录谁定义了自己
// list应该是放订阅者的回调，事件触发就去执行
function Hunter(name, level) {
  this.name = name
  this.level = level
  this.list = []
}

// 通知
Hunter.prototype.public = function(money) {
  console.log(this.level+'猎人'+this.name+'寻求帮助')
  this.list.forEach(item => {
    item(money)
  })
}
// 添加依赖
Hunter.prototype.subscribe = function(target, fn) {
  console.log(this.level+'猎人'+this.name+'订阅了'+target.name)
  target.list.push(fn)
}

const hunter1  = new Hunter('小明', '黄金')
const hunter2  = new Hunter('小红', '白银')
const hunter3  = new Hunter('小张', '青铜')
const hunterPeter  = new Hunter('Peter', '菜鸟')

hunter3.subscribe(hunterPeter, function(money) {
  console.log('小张表示'+(money > 200 ? '' : '暂时很忙')+'给予帮助')
})

// peter遇到困难，赏金198寻求帮助
hunterPeter.public(198)


const HunterUnion = {
  type: 'hunt',
  topics: Object.create(null),
  subscribe: function(topic, fn) {
    if(!this.topics[topic]) {
      this.topics[topic] = []
    }
    this.topics[topic].push(fn)
  },
  publish: function(topic, money) {
    if(!this.topics[topic]) return
    for(let fn of this.topics[topic]) {
      fn(money)
    }
  }
}

function HunterSub(name, level) {
  this.name = name
  this.level = level
}

HunterSub.prototype.subscribe = function(topic, fn) {
  HunterUnion.subscribe(topic, fn)
}

HunterSub.prototype.public = function(topic, money) {
  HunterUnion.publish(topic, money)
}

