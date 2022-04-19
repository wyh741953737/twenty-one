<!--漏执行任务---->
<template>
  <div class="missed-task-wrap">
    <div class="spot-check-home-wrapper">
      <rm-tab v-model="active"
              color="#00AE08"
              titleInactiveColor="#AAAAAA"
              line-width="20px"
              line-height="2px"
              sticky>
        <rm-tab-item title="漏巡检">
          <missed-check-page :dateAndActive="{active, selectedDate: selectedZeroDate}" :type="1" />
        </rm-tab-item>
        <rm-tab-item title="漏维保">
          <missed-check-page :dateAndActive="{active, selectedDate}" :type="2" />
        </rm-tab-item>
      </rm-tab>
    </div>

    <div v-if="!isRefreshing && active===0" @click="monthZeroVisible=true" class="month-picker-wrap">{{selectedZeroYear}}<span>年</span>{{selectedZeroMonth}}<span>月</span><img :src="selectIcon" alt="" class="select-icon" /></div>
    <div v-if="!isRefreshing && active===1" @click="monthVisible=true" class="month-picker-wrap">{{selectedYear}}<span>年</span>{{selectedMonth}}<span>月</span><img :src="selectIcon" alt="" class="select-icon" /></div>
    <div class="picker" v-show="monthVisible">
      <rm-popup v-model="monthVisible" position="bottom">
         <rm-datetime-picker
          class="picker-content"
          v-model="currentDate"
          type="year-month"
          title="选择年月"
          @cancel="monthVisible=false"
          @confirm="onConfirm"
        />
      </rm-popup>
    </div>
    <div class="picker" v-show="monthZeroVisible">
      <rm-popup v-model="monthZeroVisible" position="bottom">
         <rm-datetime-picker
          class="picker-content"
          v-model="currentZeroDate"
          type="year-month"
          title="选择年月"
          @cancel="monthZeroVisible=false"
          @confirm="onZeroConfirm"
        />
      </rm-popup>
    </div>
  </div>
</template>

<script>
import { rmTab, rmTabItem, rmPopup, rmDatetimePicker } from 'remain-ui'
import MissedCheckPage from './missedCheckPage.vue'
import selectIcon from './images/2x/nextblack_icon_place@2x.png'
import { commonBridge } from 'remain-js-sdk'

export default {
  name: 'transportationSystem',
  components: {
    rmTab,
    rmTabItem,
    rmPopup,
    rmDatetimePicker,
    'missed-check-page': MissedCheckPage
  },
  props: {

  },
  data () {
    return {
      monthVisible: false,
      monthZeroVisible: false,
      selectIcon,
      active: 0,
      currentZeroDate: new Date(),
      currentDate: new Date(),
      selectedZeroDate: new Date(),
      selectedDate: new Date()
    }
  },
  mounted () {
    commonBridge.commonSetTitle('漏执行任务')
  },
  computed: {
    selectedZeroYear () {
      return new Date(this.selectedZeroDate).getFullYear()
    },
    selectedZeroMonth () {
      let month = new Date(this.selectedZeroDate).getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      return month
    },
    selectedYear () {
      return new Date(this.selectedDate).getFullYear()
    },
    selectedMonth () {
      let month = new Date(this.selectedDate).getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      return month
    }
  },
  methods: {
    // 月份选择确定
    async onConfirm (val) {
      this.currentDate = val
      this.selectedDate = val
      this.monthVisible = false
    },
    async onZeroConfirm (val) {
      this.currentZeroDate = val
      this.selectedZeroDate = val
      this.monthZeroVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.missed-task-wrap {
  position: relative;
  .spot-check-home-wrapper {
      position: relative;
      ::v-deep .van-tab {
        padding-top: 10px;
        font-size: 15px;
        white-space: nowrap;
        text-overflow: initial;
      }
      ::v-deep .van-tab--active {
        padding-top: 10px;
        color: #00AE08;
      }
      ::v-deep .van-tabs__nav {
        background: #F0F2F2 !important;
        width: 150px;
      }
      ::v-deep .van-tabs__wrap {
        height: 50px;
        background: #F0F2F2;
      }
      ::v-deep .van-hairline--top-bottom:after,
      .van-hairline-unset--top-bottom:after {
        border-width: 0px;
      }
      ::v-deep .van-sticky {
        background: #F0F2F2;
      }
      .missed-task-item {
        padding: 10px 15px;
      }
  }
  .month-picker-wrap {
    position: fixed;
    top: 10px;
    right: 15px;
    z-index: 100;
    display: flex;
    align-items: center;
    padding: 5px 12px;
    font-size: 15px;
    color: #334455;
    border-radius: 28px;
    background: #FFFFFF;
    span {
      margin: 0 5px;
    }
    .select-icon {
      width: 20px;
      height: 20px;
    }
  }
  .picker {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .picker-content {
      border-radius: 10px 10px 0 0;
    }
  }

}
</style>
