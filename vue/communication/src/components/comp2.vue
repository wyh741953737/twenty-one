<template>
   <div>
      <div>组件2的$attrs：{{$attrs}}</div>
   </div>
</template>

<script>
export default {
   name: "comp-2",
   props: {
      flag: Boolean,
      id: Number
   },
   data() {
    return {
      value: 'aa'
    }
   },
   mounted() {
      console.log('组件2的$attrs', this.$attrs); // props为{} 时 this.$attrs = { "id": 1, "msg": "comp1's msg" }
      console.log('组件2的$attrs', this.$attrs); // props为{ flag: Boolean } 时 this.$attrs = { "id": 1, "msg": "comp1's msg" }
      console.log('组件2的$attrs', this.$attrs); // props为{ flag: Boolean, id: Number } 时 this.$attrs = { "msg": "comp1's msg" }
      console.log('组件2的$attrs', this.$attrs); // props为{ flag: Boolean, id: Number, msg: String } 时 this.$attrs = {}
      console.log('inject接收注入的数据', this.provideMsg, this.obj)
   },
   updated() {
     console.log('子组件更新', this.provideMsg, this.obj)
   },
   methods: {
     onFocus() {
       console.log("获得焦点");
     },
     inputData(val) {
       console.log(val);
     }
   }
}
</script>