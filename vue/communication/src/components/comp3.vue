<template>
   <div :msg="msg">组件3的$attrs：{{ $attrs }}</div>
</template>

<script>
export default {
   name: "comp-3",
   props: {
      msg: String
   },
   mounted() {
      console.log('组件3的$attrs', this.$attrs);  // { "id": 1 }
   }
}
</script>