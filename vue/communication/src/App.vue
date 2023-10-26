<template>
  <div id="app">
    <Comp1 />
  </div>
</template>

<script>
import Comp1 from './components/comp1.vue'

export default {
  name: 'App',
  components: {
    Comp1
  }
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
