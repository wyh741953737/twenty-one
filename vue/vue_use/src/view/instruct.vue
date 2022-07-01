<template>
  <div>
    <div style="color: red">vue中提供两种指令：一种是内置指令，另一种是自定义指令。所有的指令都是以 v- 开头的<br/>常用的内置指令有v-show、v-if、v-else、v-for、v-model、v-on、v-bind、v-cloak、v-text、v-html、v-once、v-pre等</div>
    <!-- <h1 @click="clickDom">测试</h1>
    <div v-html="html"></div>
    <div v-text="html"></div>
    <h1 v-cloak>{{cloak}}</h1>
    <h3 v-once>{{once}}</h3>
    <h3>{{once}}</h3>
    <h2 v-pre>{{pre}}</h2>
    <h3 v-big>我是自定义指令</h3>
    <h3 v-focus>我是focus自定义指令{{once}}</h3> -->
    <br/><br/>
     <label v-for="item in originhobbies" :for="item" :key="item">
      <input type="checkbox" :value="item" :id="item" v-model="hobbies">{{item}}
    </label>
    <button v-copy="hobbies">自定义指令-复制</button>
    <!-- <div>
      <h2>权限校验</h2>
      <button v-permission="1">权限按钮1</button>
      <button v-permission="9">权限按钮1</button>
    </div> -->
    <!-- <div style="marginTop: 40px">
      <button v-draggable>测试拖拽</button>
    </div> -->
    <!-- <h1 v-longPress="longPress">长按</h1> -->
    <!-- <div class="img-wrap" v-for="item in urls" :key="item">
      <img alt="" v-lazyLoad="item" />      
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'InstructComp',
  data () {
    return {
      cloak: '网速慢的时候将未经解析的模板隐藏',
      once: 'once初次渲染后就不再进行结构的更新',
      pre: 'pre会跳过其节点编译过程，跳过没有使用指令和插值语法的节点，加快编译',
      html: '<h1>{{name}}你好</h1>',
      copyText: '我是复制的内容',
      hobbies:[],//多选框
      originhobbies:['篮球','排球','乒乓球','足球','网球','羽毛球'],
      urls: [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201603%2F17%2F20160317125454_XB2df.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041290&t=f178871d4af3d74326cbd0367f9e9602',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdesk-fd.zol-img.com.cn%2Ft_s960x600c5%2Fg5%2FM00%2F0E%2F04%2FChMkJl4lFEaIaptbAANb1ASq75IAAweEwIKA5kAA1vs073.jpg&refer=http%3A%2F%2Fdesk-fd.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041290&t=5fe851e8d59a465acc418a30f4a2b804',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp.qqan.com%2Fup%2F2020-8%2F15984060174367689.jpg&refer=http%3A%2F%2Fp.qqan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041290&t=cb3eedac3d5291d4de857393bc5ffed3',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5f207f3959da3975966c60433c9903a47e36843dd929-uWbarg_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041290&t=17fd14047e7fed9db7157dde998e108f',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201311%2F21%2F20131121155922_aPzjj.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041290&t=d35578389e28a6bb5ba3a05d3e205726',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pc841.com%2F2018%2F0305%2F20180305103218715.jpg&refer=http%3A%2F%2Fimg.pc841.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041290&t=f7d64b8f90276ac690be47e5ddd9198a',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4963ba3132f4d8b1ec560389ad4ceade50fd3cdb6ee5-Z3MGfz_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041290&t=d892e128a1eb3552658ff81cd1bab568',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftupian.qqjay.com%2Fu%2F2017%2F1023%2F2_151729_9.jpg&refer=http%3A%2F%2Ftupian.qqjay.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041290&t=7037556a54857aa7cfcb0356cea6b431',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.51tietu.net%2Fupload%2Fwww.51tietu.net%2F2017-041120%2F20170411205722lehw5lod0ac.jpg&refer=http%3A%2F%2Fimg2.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041290&t=f813ce8131ef3152c8176c67bde1487b',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftupian.qqjay.com%2Fu%2F2013%2F1209%2F1_111030_12.jpg&refer=http%3A%2F%2Ftupian.qqjay.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041384&t=f00172fc6b8140e72b318d86ba3351d8',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftupian.qqjay.com%2Fu%2F2016%2F0830%2F1_15428_4.jpg&refer=http%3A%2F%2Ftupian.qqjay.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041384&t=26d5c6347e8938c4032a539eb6d31a06'
      ]
    }
  },
  methods: {
    clickDom () {
      this.once = '哈哈哈哈哈'
    },
    longPress () {
      alert('长按')
    }
  },
  directives: {
    // 指令调用时机：指令与元素绑定时（一上来还没放到页面），指令所在模板被重新编译时调用
    // 一些自定义指令使用场景：防抖，图片懒加载，一键copy功能，拖拽，页面水印，权限校验，输入框自动聚焦，相对时间转换，下拉菜单等
    big () {
    },
    focus: {
      bind () {
        console.log('bind只会执行一次，指令与元素绑定的时候调用')
      },
      inserted () {
        console.log('inserted绑定元素被插入到父节点时调用')
      },
      updated() {
        console.log('updated所在组件的vnode更新时候调用updated')
      },
      componentUpdated() {
        console.log('componentUpdated指令所在的组件的vnode及其子vnode全部更新后调用')
      },
      unbind () {
        console.log('unbind只调用一次，指令与元素解绑时')
      }
    },
    copy: {
      bind (el, { value }) {
        el.$value = value
        el.handler = () => {
          if(!el.$value) {
            alert('无复制内容')
            return
          }
          // 创建textArea标签
          const textarea = document.createElement('textarea')
          // 设置readOnly
          textarea.readOnly = 'readonly'
          // 将textarea移到不可视区域
          textarea.style.position = 'absolute'
          textarea.style.left = '-9999px'
          // 将输入值变成textarea的值
          textarea.value = el.$value
          // 插入到文档
          document.body.appendChild(textarea)
          // 执行select选中
          textarea.select()
          // 执行复制指令
          const result = document.execCommand('Copy')
          if(result) {
            alert('复制成功')
          }
          document.body.removeChild(textarea)
        }
        el.addEventListener('click', el.handler)
      },
      componentUpdated (el, { value }) {
        el.$value = value
      },
      unbind (el) {
        el.removeEventListener('click', el.handler)
      }
    },
    // 实现长按，用户需要下按几秒，触发相应事件
    // 实现一个定时器2秒后执行，当用户触发mousedown事件启动定时器，用户松开触发mouseout事件，如果mouseup事件2秒内被触发就清空定时器
    // 如果计时器没有在2秒内清除，视作长按，执行相关函数，在移动端要考虑touchstart和touchend
    longPress: {
      bind (el, binding) {
        if(typeof binding.value !== 'function') {
          throw new Error('callback must be a function')
        }
        let pressTimer = null
        let start = (e) => {
          console.log(e, 'mousedown和touchstart')
          if(e.type === 'click' && e.button !== 0) return
          if(pressTimer === null) {
            pressTimer = setTimeout(() => {
              handler()
            }, 2000);
          }
        }
        let cancel = () => {
          if(pressTimer !== null) {
            clearTimeout(pressTimer)
            pressTimer = null
          }
        }
        const handler = () => {
          binding.value()
        }
        el.addEventListener('mousedown', start)
        el.addEventListener('touchstart', start)
        el.addEventListener('click', cancel)
        el.addEventListener('mouseout', cancel)
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
      },
      componentUpdated(el, {value}) {
        el.$value = value
      },
      unbind (el) {
        el.removeEventListener('click', el.handler)
      }
    },
    // 防抖：以最后一次的操作为准，每隔n秒执行一次，n秒内触发重新记时
    // 节流：一段时间内只会触发一次。比如水滴，n秒内执行一次
    // 业务：监听滚动，搜索用户不断地输入，用防抖节约资源。鼠标不断点击，window.resize，屏保，用节流
    // 监听滚动事件，假设2秒内用户不断触发滚动事件，只有用户暂停滚动后才执行响应操作
    // 节流就像地铁，到时间关门，防抖像公交车，等最后一个人上车才关门
    debounce: {
      inserted (el, binding) {
        let timer
        const handler = () => {
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            binding.value()
          }, 1000);
        }
        el.addEventListener('click', handler)
      }
    },
    // 开发中遇到表单输入，会对输入内容的限制，比如不能输入表情和特殊字符，我们一般给表单加onChange事件处理，代码量大不好维护，可以自定义一个指令
    emoji: {
      bind: function (el) {
        const regRule = /^(\d)/g
        let elment = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')
        el.elment = elment
        elment.handler = function () {
          let val = elment.value
          elment.value = val.replace(regRule, '')
          const e = document.createEvent('HTMLEvents')
          e.initEvent('input', true, true)
          el.dispatchEvent(e)
        }
        elment.addEventListener('keyup', elment.handler)
      },
      unbind (el) {
        el.elment.removeEventListener('keyup', el.elment.handler)
      }
    },
    // 懒加载：判断图片是否到达可视区，实现方案：scroll事件监听，或者IntersectionObserve判断（有浏览器兼容性问题）
    lazyLoad: {
      bind (el, binding) { // value设置为一个数组，第一个为真实url，第二个是默认图片 // 指令与元素绑定的时候初始化数据
        el.setAttribute('data-src', binding.value)
        el.setAttribute('src', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F0G020114924%2F200G0114924-15-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658041696&t=70ca6baf2c752866eb01f0edf49cd52c')
      },
      inserted(el) {
        const load = (el) => {
          const windowHeight = document.documentElement.clientHeight
          const eTop = el.getBoundingClientRect().top
          const eBtm = el.getBoundingClientRect().bottm
          const realSrc = el.dataset.src
          if(eTop - windowHeight < 0 && eBtm > 0 && realSrc) {
            el.src = realSrc
            el.removeAttribute('data-src')
          }
        }
        const observe = (el) => {
          const io = new IntersectionObserver((entries) => {
            const realSrc = el.dataset.src
            if(entries[0].isIntersecting) { // 如果进入可视区,真实路径赋值，并且删除data-src属性
              if(realSrc) {
                el.src = realSrc
                el.removeAttribute('data-src')
              }
            }
          })
          io.observe(el)
        }
        const throttle = (fn, delay) => {
          let timer = null
          return function(...args) {
            const that = this
            if(!timer) {
              timer = setTimeout(() => {
                timer = null
                fn.apply(that, args)
              }, delay);
            }
          }
        }
        const listenerScroll = (el) => {
          const handler = throttle(load, 300)
          load(el)
          window.addEventListener('scroll', handler)
        }
        if(IntersectionObserver) {
          observe(el)
        } else {
          listenerScroll(el)
        }
      }
    },
    // 权限校验，很多时候用v-ifv-show显示隐藏，但是如果判断添加多就会显得代码冗余
    permission: {
      inserted (el, binding) {
        const checkArray = (key) => {
          let arr = [1, 2, 3, 4]
          if(arr.indexOf(key) > -1) {
            return true
          }
          return false
        }
        const permission = binding.value
        if(permission) {
          const hasPermission = checkArray(permission)
          if(!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el)
          }
        }
      }
    },
    // 拖拽
    draggable: {
      inserted: function (el) {
      el.style.cursor = 'move'
      el.onmousedown = function (e) {
        let disx = e.pageX - el.offsetLeft
        let disy = e.pageY - el.offsetTop
        document.onmousemove = function (e) {
          let x = e.pageX - disx
          let y = e.pageY - disy
          let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
          let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
          if (x < 0) {
            x = 0
          } else if (x > maxX) {
            x = maxX
          }
  
          if (y < 0) {
            y = 0
          } else if (y > maxY) {
            y = maxY
          }
  
          el.style.left = x + 'px'
          el.style.top = y + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
      }
     }
    }
  }
}
</script>

<style lang="css">
 [v-cloak] {
  display: none;
 }
 .img-wrap {
  width: 500px;
  height: 500px;
  margin: auto;
  padding: 10px;
 }
 .img-wrap img {
  width: 100%;
  height: 100%;
 }
  
</style>