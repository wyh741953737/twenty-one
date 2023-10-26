<template>
  <div class="compc">
    <h5>C组件</h5>
    <p>收到来自A组件的消息：{{ messageFromA  }}</p>
  </div>
</template>
<script>
export default {
  name: 'Comp-c',
  inject: ['messageFromA'], // 通过inject接受A中provide传递过来的message
  mounted () {
    console.log('C组件mounted')
  },
  updated () {
    console.log('C组件updated')
  }
}
</script>
