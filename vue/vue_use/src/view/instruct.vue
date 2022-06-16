<template>
  <div>
    <h1 @click="clickDom">测试</h1>
    <div v-html="html"></div>
    <div v-text="html"></div>
    <h1 v-cloak>{{cloak}}</h1>
    <h3 v-once>{{once}}</h3>
    <h3>{{once}}</h3>
    <h2 v-pre>{{pre}}</h2>
    <h3 v-big>我是自定义指令</h3>
    <h3 v-focus>我是focus自定义指令{{once}}</h3>
    <button v-copy="copyText">复制</button>
  </div>
</template>

<script>
export default {
  name: 'InstructComp',
  data () {
    return {
      cloak: '网速慢的时候将未经解析的模板隐藏',
      name: '指令',
      once: 'once初次渲染后就不再进行结构的更新',
      pre: 'pre会跳过其节点编译过程，跳过没有使用指令和插值语法的节点，加快编译',
      html: '<h1>{{name}}你好</h1>',
      copyText: '我是复制的内容'
    }
  },
  methods: {
    clickDom () {
      this.once = '哈哈哈哈哈'
    },
    onCopy(){
        document.execCommand('Copy'); // 执行浏览器复制命令
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
            console.log('无复制内容')
            return
          }
          const textarea = document.createElement('textarea')
          textarea.readOnly = 'readonly'
          textarea.style.position = 'absolute'
          textarea.style.left = '-9999px'
          textarea.value = el.$value
          document.body.appendChild(textarea)
          textarea.select()
          const result = document.execCommand('Copy')
          if(result) {
            console.log('复制成功')
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
    }
  }
}
</script>

<style lang="css">
 [v-cloak] {
  display: none;
 }
  
</style>