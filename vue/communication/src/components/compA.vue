<template>
  <div class="compa">
    <input type="text" v-model="message.content" />
    <CompB />
  </div>
</template>
<script>
import CompB from './compB'
export default {
  name: 'Comp-A',
  provide() {
    return {
      messageFromA: this.message,  // 将message通过provide传递给子孙组件
    }
  },
  data() {
    return {
      message: {
        content: '',
      },
    }
  },
  components: {
    CompB,
  },
  mounted () {
    console.log('父组件mounted')
  },
  updated () {
    console.log('父组件updated')
  }
}
</script>
