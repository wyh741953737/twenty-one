<template>
  <div>
     <comp2 class="comp2" :style="comp2Style" :flag="flag" :id="id" :msg="msg" :changeId="getChangedId" />
     <comp3 ref="comp3" />
     <button @click="change">父组件改变</button>
     <comp4 v-model="model_Val" />
     <comp5 />
     <compA />
     <Parent />

  </div>
</template>

<script>
import Comp2 from "./comp2";
import Comp3 from "./comp3";
import Comp4 from "./comp4";
import Comp5 from "./comp5";
import CompA from "./compA";
import Parent from "./c-parent";


export default {
   name: "comp-1",
   components: { Comp2, Comp3, Comp4, Comp5, CompA, Parent },
   data() {
      return {
         id: 1,
         msg: "comp1's msg",
         msg4: '参数4',
         flag: true,
         obj: {
          name: '哈哈哈'
        },
        provideMsg: '我是父组件通过Provide传给子组件的数据',
        modelVal: '哈哈哈',
        model_Val: '',
        comp2Style: "color: pink"
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
    console.log('=======', this.model_Val)
   },
   updated() {
    console.log('父组件更新')
    console.log('===update====', this.model_Val)

   },
   methods: {
    getChangedId (val) {
      this.id = val
    },
    change () {
      this.obj = '你好啊'
      this.provideMsg = '急急急'
    }
   }
}
</script>