<!--故障发生页面--->
<template>
  <div class="fault-happen-wrap">
    <empty-view
      v-if="recordList.length === 0"
      :content="$t('base.noContentForNow')"
      class="empty-view"/>
    <div class="list">
      <div v-for="record in recordList" :key="record.id" class="record-item" @click="toFaultPage(record.categoryId, record.categoryName)">
          <div class="fault-happen-system van-hairline--bottom">
            <img class="system-icon" :src="`./images/${systemIcon[record.categoryId]}.png`">{{record.categoryName}}
          </div>
          <div class="fault-happen-text">当月发生<span>{{record.devicefailureNum}}</span>次故障</div>
        </div>
    </div>
    <div v-show="!isRefreshing" @click="monthVisible=true" class="month-picker-wrap">{{selectedYear}}<span>年</span>{{selectedMonth}}<span>月</span><img :src="selectIcon" alt="" class="select-icon" /></div>
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
  </div>
</template>

<script>
import Vue from 'vue'
import { getDevicefailureInfoList } from './api'
import { systemIcon } from './map'
import selectIcon from './images/2x/nextblack_icon_place@2x.png'
import { rmPopup, rmDatetimePicker } from 'remain-ui'
import { commonBridge } from 'remain-js-sdk'
const { components } = Vue.prototype.$getMicroAppExternals()
const { EmptyView } = components

export default {
  name: 'FaultHappen',
  components: {
    EmptyView,
    rmPopup,
    rmDatetimePicker
  },
  data () {
    return {
      recordList: [],
      systemIcon,
      selectIcon,
      monthVisible: false,
      currentDate: new Date(),
      selectedDate: new Date()
    }
  },
  computed: {
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
  mounted () {
    commonBridge.commonSetTitle('故障发生')
    this.getData()
  },
  methods: {
    async getData () {
      const params = {
        date: `${this.selectedYear}-${this.selectedMonth}`
      }
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url: getDevicefailureInfoList,
          params
        })
        if (status === 100 && data) {
          this.recordList = data
        }
        return status
      } catch (e) {
        return -1
      }
    },
    // 月份选择确定
    async onConfirm (val) {
      this.currentDate = val
      this.selectedDate = val
      this.getData()
      this.monthVisible = false
    },
    toFaultPage (categoryId, categoryName) {
      this.$router.push({
        name: '/LM_FE_H5_DevicePanel_LC/faultPage',
        query: {
          type: 'faultList',
          categoryId,
          categoryName
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fault-happen-wrap {
  position: relative;

  .empty-view {
    position: absolute;
    top: 52px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .list {
    padding-top: 40px;
    margin-top: 10px;
    min-height: calc(100vh - 52px);
    box-sizing: border-box;
    padding-bottom: 40px;
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .record-item {
      padding: 15px;
      margin: 10px 15px;
      background: #FFFFFF;
      border-radius: 10px;
      .fault-happen-system {
        padding-bottom: 15px;
        margin-bottom: 15px;
        font-size: 18px;
        font-weight: 600;
        color: #334455;
        line-height: 25px;
        .system-icon {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      }
      .fault-happen-text {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #334455;
        line-height: 16.5px;
        span {
          margin: 0 5px;
          font-size: 18px;
          font-weight: 600;
          color: #00AE08;
          line-height: 25px;
        }
      }
    }
  }
  .month-picker-wrap {
    position: absolute;
    top: 10px;
    right: 15px;
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
