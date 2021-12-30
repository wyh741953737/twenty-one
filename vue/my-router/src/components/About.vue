<template>
  <div class="hello">
    About
    <p @click="$store.commit('add')">count: {{$store.state.counter}}</p>
    <p @click="$store.dispatch('asyncAdd')">asyncCount: {{$store.state.age}}</p>
    <p>我是getters---{{$store.getters.doubleCount}}</p>
    <p>我是另一个getters---{{$store.getters.doubleDoubleCount}}</p>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>


