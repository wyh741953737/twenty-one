<template>
  <div class="hello">
    About
    <p @click="$store.commit('add')">count: {{$store.state.count}}</p>
    <p @click="$store.dispatch('asyncAdd')">asyncCount: {{$store.state.count}}</p>
    <p>{{$store.getters.doubleCount}}</p>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>


