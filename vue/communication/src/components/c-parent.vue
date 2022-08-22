<template>
  <div class="parent">
    <h3>父组件</h3>
    <input type="text" v-model="message" />
    <p>收到来自子组件的消息：{{ child1.message }}</p>
    <Child />

  </div>
</template>
<script>
import Child from './c-child'
export default {
  name: 'parent-comp',
  data() {
    return {
      message: '',
      child1: {}
    }
  },
  components: {
    Child
  },
  mounted() {
    this.child1 = this.$children.find((child) => {
      return child.$options._componentTag === 'Child'
    }) || {message: ''}
  }
}
</script>
<style scoped>
.parent {
  color: red;
}
</style>