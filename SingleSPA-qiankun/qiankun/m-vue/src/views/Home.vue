<template>
  <div class="home">
    <div>
      appName:<span class="name">{{ name || 'Vue-Home' }}</span>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  props: ['name'],
  components: {
    HelloWorld
  },
  mounted() {
  },
}
</script>
