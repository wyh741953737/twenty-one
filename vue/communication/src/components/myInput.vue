<template>
   <input type="text" :value="value" v-on="inputListeners" />
</template>

<script>
   export default {
      name: "MyInput",
      props: {
         value: String
      },
      computed: {
          inputListeners: function () {
              const vm = this
              return Object.assign({},
                // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    // 这里确保组件配合 `v-model` 的工作
                    input: function (event) {
                      vm.$emit('input', event.target.value)
                    }
                }
              )
          }
      },
   }
</script>