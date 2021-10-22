<template>
  <div class="not-found-container">
    <div class="tips"
         v-text="tips"></div>
  </div>
</template>
<script>
export default {
  name: 'notFound',
  data () {
    return {
      tips: '页面开发中...'
    }
  }
}
</script>

<style scoped>
</style>
