<template>
  <div>
     <comp2 :flag="flag" :id="id" :msg="msg" />
     <comp3 ref="comp3" />
     <button @click="change">父组件改变</button>
  </div>
</template>

<script>
import Comp2 from "./comp2";
import Comp3 from "./comp3";

export default {
   name: "comp-1",
   components: { Comp2, Comp3 },
   data() {
      return {
         id: 1,
         msg: "comp1's msg",
         flag: true,
         obj: {
          name: '哈哈哈'
        },
        provideMsg: '我是父组件通过Provide传给子组件的数据',
      }
   },
  //  provide: {
  //     provideMsg: '我是父组件通过Provide传给子组件的数据',
  //     obj: {
  //         name: '哈哈哈'
  //       }
  //  }, 
  provide () { // 当provide/inject的是一个对象时，是可响应的，子组件改变值，父组件也会改变，父组件改变子组件也会改变
    const _this = this
    return {
      provideMsg: _this.provideMsg,
      obj: _this.obj
    }
  },
   mounted() {
    console.log('comp3', this.$refs.comp3)
   },
   updated() {
    console.log('父组件更新')
   },
   methods: {
    change () {
      this.obj = '你好啊'
      this.provideMsg = '急急急'
    }
   }
}
</script>