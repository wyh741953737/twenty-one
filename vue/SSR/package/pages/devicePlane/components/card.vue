<template>
  <div class="due-soon-card">
    <div :class="{'border-wrap': true, 'flex': true, 'van-hairline--bottom' : showBorder }">
      <img :src="cardItem.picUrl" alt="">
      <div class="card-right">
        <div class="card-right-item flex">
          <span class="item-top-text">{{cardItem.name}}</span>
          <span v-if="cardItem.expireTime" :class="`due-day ${index === 0 ? 'due-day-first' : ''}`">{{cardItem.expireTime}}天后到期</span>
        </div>
        <div class="card-right-center">{{cardItem.serialNum}}</div>
        <div class="card-right-bottom">{{cardItem.address}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    cardItem: Object,
    index: Number,
    showBorder: Boolean
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.due-soon-card {
  background: #FFFFFF;
  border-radius: 5px;
  .flex {
      display: flex;
      justify-content: space-between;
      align-content: center;
  }
  .border-wrap {
    margin: 0 15px;
    padding: 15px 0;
    img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        max-width: 100%;
        max-height: 100%;
      }
    .card-right {
      height: 80px;
      flex: 1;
      .card-right-item {
        margin-bottom: 5px;
        align-items: center;

        .item-top-text {
          font-size: 18px;
          line-height: 25px;
          font-weight: 500;
          color: #334455;
        }
        .due-day {
          font-size: 12px;
          line-height: 16.5px;
          color: #334455;
        }
        .due-day-first {
          color: #C6444C;
        }
      }
      .card-right-center {
        margin-bottom: 12px;
        font-size: 12px;
        line-height: 16.5px;
        color: #AAAAAA;
      }
      .card-right-bottom {
        font-size: 15px;
        font-weight: 400;
        line-height: 21px;
        color: #AAAAAA;
      }

    }
  }
}
</style>
