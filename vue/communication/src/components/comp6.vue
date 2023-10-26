<template>
  <div class="compb">
    <h4>B组件</h4>
    <input name="compB" type="text" v-model="message" v-on="$listeners" />  <!--将A组件keyup的监听回调绑在该input上-->
    <p>收到来自A组件的消息：{{ $attrs.messageFromA }}</p>
    <CompC v-bind="$attrs" v-on="$listeners" /> <!--将A组件keyup的监听回调继续传递给C组件，将A组件传递的attrs继续传递给C组件-->
  </div>
</template>
<script>
import CompC from './comp7'
export default {
  name: 'Comp-B',
  components: {
    CompC,
  },
  data() {
    return {
      message: '',
    }
  }
}
</script>

<style scoped>
.compb {
  width: 60%;
  margin: 30px auto;
  border: 1px solid green;
}
</style>
