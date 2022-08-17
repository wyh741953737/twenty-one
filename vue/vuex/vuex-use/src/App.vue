<template>
  <div id="app">
    <h1>金合欢花好</h1>
    <h2>我今年{{age}}岁了</h2>
    <h3>{{userName}}</h3>
    <h4>{{fullName}}</h4>
    <button @click="changeStoreState">commit一个mutation</button>
    <button @click="changeAge">同步mutations</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  mounted() {
    console.log('====', this.$store)
  },
  // computed: mapState({
    //   userName: state => state.userName,
    //   ageAlias: 'age', // 传字符串age等同于 state => state.age
    //   fullName (state) {
    //     return 'wu' + state.userName
    //   }
    // })
    // 当计算属性名称和state状态名称相同可以用数组
  computed: {
    fullName () {
      return this.$store.getters.fullName
    },
    ...mapState(['age', 'userName']),
  },
  methods: {
    changeStoreState () {
      this.$store.commit('changeName', '你好啊')
    },
    changeAge () {
      this.$store.commit('changeAge', 12)
    }
  },
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
