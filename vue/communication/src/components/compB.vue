<template>
  <div class="compb">
    <p>收到来自A组件的消息：{{ messageFromA && messageFromA.content }}</p>
    <CompC />
  </div>
</template>
<script>
import CompC from './compC'
export default {
  name: 'Comp-B',
  inject: ['messageFromA'], // 通过inject接受A中provide传递过来的message
  components: {
    CompC,
  },
}
</script>
