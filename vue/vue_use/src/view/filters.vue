<template>
  <div>
    <div>现在是{{time | formatTime}}月份</div>
    <div>{{obj | sortName}}</div>
  </div>
</template>

<script>
export default {
  name: 'FilterComp',
  data () {
    return {
      time: new Date().getMonth(),
      obj: {
        firstName: '我的名字',
        secondName: '是你'
      }
    }
  },
  filters: {
    formatTime (val) {
      return '0' + val
    },
    sortName (val) {
      return val.firstName + val.secondName
    }
  }
}
</script>