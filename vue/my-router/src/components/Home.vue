<template>
  <div class="hello">
    Home
    <button @click="goChild">去子组件</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goChild() {
      this.$router.push({
        path: '/child'
      })
    }
  },
}
</script>


