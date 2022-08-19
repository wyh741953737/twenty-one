<template>
  <div class="hello">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'C-Child',
  props: {  // 当组件没有写props时能够通过this.$attrs访问到父组件传递的参数
    news: String,
    age: Number
  },
  mounted () { // 如果组件写了props，只能通过this.news和this.age来获取父组件传的参数
    console.log('子组件的$attrs', this.$attrs, this.news, this.age)
  },
  data () {
    return {
      msg: '我是子组件',
    }
  }
}
</script>

