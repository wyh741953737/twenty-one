<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    this.resizeRoot()
    window.addEventListener('resize', () => {
      this.resizeRoot()
    })
  },
  methods: {
    resizeRoot () {
      // 获取设备可视区宽度
      const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
      // 获取根元素
      const htmlDom = document.getElementsByTagName('html')[0]
      // 更改根元素的字体大小
      htmlDom.style.fontSize = htmlWidth / 375 * 16 + 'px'
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
