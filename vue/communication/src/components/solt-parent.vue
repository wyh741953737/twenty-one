<template>
  <div class="parent">
    <h3>父组件</h3>
    <input type="text" v-model="message" />
    <Child>
      <template v-slot:child>
        {{ message }}  <!--插槽要展示的内容-->
      </template>
    </Child>
  </div>
</template>
<script>
import Child from './solt-child.vue'
export default {
  name: 'solt-parent',
  data() {
    return {
      message: '',
    }
  },
  components: {
    Child,
  },
}
</script>
