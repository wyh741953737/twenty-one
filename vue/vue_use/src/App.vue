<template>
  <div id="app">
    <filter-comp />
    <instruct-comp />
  </div>
</template>

<script>
import FilterComp from './view/filters.vue'
import InstructComp from './view/instruct.vue'

export default {
  name: 'App',
  components: {
    'filter-comp': FilterComp,
    'instruct-comp': InstructComp
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
