<template>
  <div id="app">
    age: {{this.$store.state.age}}
    <button @click="incre">增加</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    incre() {
      this.$store.commit('changeAge', 1)
    }
  }
}
</script>

