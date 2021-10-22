<template>
  <div class="iframe-panel-container">
    <iframe class="iframe"
            v-if="iframeVisible"
            :src="src"
            frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'iframe-panel',
  data () {
    return {
      src: '',
      iframeVisible: true
    }
  },
  watch: {
    '$route': {
      handler (newValue) {
        const { src } = newValue.query
        this.src = src
        this.iframeVisible = false
        this.$nextTick(() => {
          this.iframeVisible = true
        })
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
</style>
