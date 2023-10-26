<template>
  <div class="compa">
    <h3>A组件</h3>
    <input type="text" v-model="message" />
    <p>收到来自{{ comp }}的消息：{{ messageFromComp }}</p>
    <CompB :messageFromA="message" @keyup="receive" />  <!--监听子孙组件的keyup事件，将message传递给子孙组件-->
  </div>
</template>
<script>
import CompB from './comp6'
export default {
  name: 'Comp-A',
  data() {
    return {
      message: '',
      messageFromComp: '',
      comp: '',
    }
  },
  components: {
    CompB,
  },
  methods: {
    receive(e) { // 监听子孙组件keyup事件的回调，并将keyup所在input输入框的值赋值给messageFromComp
      this.comp = e.target.name
      this.messageFromComp = e.target.value
    },
  },
}
</script>
<style scoped>
.compa {
  width: 50%;
  margin: 30px auto;
  border: 1px solid #7104ff;
}
</style>
