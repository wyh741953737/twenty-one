<template>
  <div id="app">
     <ul>
        <li v-for="(item,index) in arr" :key="index" @click="changeData">{{item}}</li>
      </ul>
      <div>{{obj.name}}</div>
      <div>{{obj.age}}</div>
      <div ref="divref"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      arr: [1, 2, 3],
      obj: {}
    }
  },
  methods: {
    changeData() {
       this.arr = [4,5,6,7]
       setTimeout(() => {
         document.querySelectorAll('li')[3].innerHTML="44444444444444"
         console.log('methods', document.querySelectorAll('li').length) 
       });
      //  this.obj = {name: 'AAAA', age: 12}
      //  this.obj.name = '哈哈哈哈'
      //  this.obj.age = 12
       this.$refs.divref.innerHTML = 'aaaaaaaaaaaaaaa'
    }
  }
}
</script>

