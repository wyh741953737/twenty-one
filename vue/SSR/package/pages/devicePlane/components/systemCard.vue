<template>
  <div class="system-card">
    <div class="card-top">
      <Card :cardItem="cardItem" :showBorder="true" />
    </div>
    <div :class="{'card-bottom': true, 'flex-reverse': !showFailureNum}">
      <div v-if="showFailureNum"><img class="fault-icon" :src="faultIcon" />{{cardItem.failureNum || 0}}次故障</div>
      <div class="person-in-charge flex">责任人：{{cardItem.chargerUserName}}<img class="telephone-icon" :src="phoneIcon" @click="callPerson(cardItem)"/></div>
    </div>
    <div class="order-wrap" v-if="cardItem.longestDealOrderInfoList && cardItem.longestDealOrderInfoList.length > 0">
      <div v-for="item in cardItem.longestDealOrderInfoList" :key="item.deviceId">
        <div class="order-no flex">
          <div class="order-no-left">
            <div class="order-no-text">工单编号：{{item.serialNumber}}</div>
            <div class="order-no-text time">维修耗时：{{item.repairTime}}小时</div>
          </div>
          <img class="arrow-right" :src="rightIcon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './card'
import phoneIcon from '../images/2x/phone_icon_white@2x.png'
import faultIcon from '../images/2x/fault@2x.png'
import rightIcon from '../images/2x//deviceRateArrow@2x.png'
import { commonBridge } from 'remain-js-sdk'

export default {
  name: 'SystemCard',
  props: {
    cardItem: Object,
    showFailureNum: Boolean
  },
  components: {
    Card
  },
  data () {
    return {
      phoneIcon,
      faultIcon,
      rightIcon
    }
  },
  methods: {
    callPerson (cardItem) {
      commonBridge.commonMakePhoneCall({
        phoneNumber: cardItem.chargerUserPhone
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.system-card {
  margin: 10px 15px;
  padding-bottom: 11px;
  background: #FFFFFF;
  border-radius: 5px;
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-bottom {
    padding: 12px 15px 0 15px;
    color: #C6444C;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fault-icon {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
    .person-in-charge {
        font-size: 15px;
        line-height: 21px;
        color: #334455;
        .telephone-icon {
          width: 18px;
          height: 18px;
          margin-left: 10px;
        }
    }
  }
  .flex-reverse {
    flex-direction: row-reverse;
  }
  .order-wrap {
    margin: 12.5px 15px 0 15px;
    .order-no {
      padding: 15px;
      background: #F7F8FA;
      border-radius: 3px;
      .order-no-text {
        font-size: 15px;
        line-height: 21px;
        color: #334455;
      }
      .time {
        margin-top: 10px;
      }
      .arrow-right {
        width: 16px;
        height: 16px;
      }
    }
    .order-no:not(:first-child) {
      margin-top: 10px;
    }
    .order-no:last-child {
      margin-bottom: 5px;
    }
  }
}
</style>
