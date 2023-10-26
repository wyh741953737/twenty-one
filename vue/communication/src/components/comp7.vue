<template>
  <div class="compc">
    <h5>C组件</h5>
    <input name="compC" type="text" v-model="message" v-on="$listeners" /> <!--将A组件keyup的监听回调绑在该input上-->
    <p>收到来自A组件的消息：{{ $attrs.messageFromA }}</p>
  </div>
</template>
<script>
export default {
  name: 'Comp-C',
  data() {
    return {
      message: '',
    }
  },
}
</script>

<style scoped>
.compc {
  width: 50%;
  margin: 30px auto;
  border: 1px solid red;
}
</style>
