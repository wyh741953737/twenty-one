<!--巡检、维保执行率---->
<template>
  <div class="epidemic-prevention-index">
    <empty-view
      v-if="recordList.length === 0"
      :content="$t('base.noContentForNow')"
      class="empty-view"/>
     <div class="list">
       <div
            v-for="record in recordList"
            :key="record.categoryId"
            >
            <div class="record-item">
              <div class="ratio-top"><img class="ratio-icon" :src="systemIcon[record.categoryId]" />{{record.categoryName}}</div>
               <div class="ratio-center flex">
                <div>任务执行率<span :class="['ratio-number', Number(record.ratio) >= 50 ? 'big-ratio': 'small-ratio']">{{record.ratio}}</span></div>
                <span class="proportion">{{record.finished}}/{{record.total}}</span>
              </div>
              <div class="ratio-bottom" ref="progress">
                <div :class="['ratio-excute-count', Number(record.ratio) >= 50 ? 'big': 'small']" :style="{ width: record.ratio}"></div>
              </div>
            </div>
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
import { rmPopup, rmDatetimePicker } from 'remain-ui'
import selectIcon from './images/2x/nextblack_icon_place@2x.png'
import { getPatrolExecutionRateInfoList, getMaintExecutionRateInfoList } from './api'
import { systemIcon } from './map'
import { commonBridge } from 'remain-js-sdk'
const { components } = Vue.prototype.$getMicroAppExternals()
const { EmptyView } = components

export default {
  name: 'ExcuteRate',
  components: {
    EmptyView,
    rmPopup,
    rmDatetimePicker
  },
  data () {
    return {
      recordList: [],
      title: '选择年月',
      currentDate: new Date(),
      monthVisible: false,
      selectIcon,
      systemIcon,
      ratioType: undefined
    }
  },
  mounted () {
    const { ratioType } = this.$route.query
    const title = ratioType === 1 ? '巡检执行率' : '维保执行率'
    commonBridge.commonSetTitle(title)
    this.ratioType = Number(ratioType)
    this.getData()
  },
  computed: {
    selectedYear () {
      return new Date(this.currentDate).getFullYear()
    },
    selectedMonth () {
      let month = new Date(this.currentDate).getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      return month
    }
  },
  methods: {
    async getData () {
      this.recordList = []
      const params = {
        date: `${this.selectedYear}-${this.selectedMonth}`
      }
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url: this.ratioType === 1 ? getPatrolExecutionRateInfoList : getMaintExecutionRateInfoList, //  1: patrol inspection巡检执行率 2: Main 维保执行率
          params
        })
        if (status === 100 && Array.isArray(data) && data.length > 0) {
          this.recordList = data.map(item => {
            const obj = {}
            obj.categoryId = item.categoryId
            obj.categoryName = item.categoryName
            obj.deviceManageSort = item.deviceManageSort
            if (this.ratioType === 1) {
              obj.finished = item.finnishPatrolNum
              obj.ratio = item.patrolExecutionRate
              obj.total = item.patrolNum
            } else if (this.ratioType === 2) {
              obj.finished = item.finnishMaintNum
              obj.ratio = item.maintExecutionRate
              obj.total = item.maintNum
            }
            return obj
          }) || []
        }
      } catch (e) {
        return -1
      }
    },
    // 月份选择确定
    async onConfirm (val) {
      console.log('我在进行月份选择')
      this.currentDate = val
      this.monthVisible = false
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.epidemic-prevention-index {
  .empty-view {
    position: absolute;
    top: 52px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
    .list {
      margin-top: 52px;
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
        .ratio-top {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: 600;
          line-height: 25px;
          color: #334455;
          .ratio-icon {
            width: 22px;
            height: 22px;
            margin-right: 5px;
          }
        }
        .ratio-center {
          margin-bottom: 10px;
          font-size: 15px;
          line-height: 21px;
          color: #334455;
          .ratio-number {
            margin-left: 10px;
            font-weight: 500;
          }
          .small-ratio {
            color: #4186FF;
          }
          .big-ratio {
            color: #00AE08;
          }
          .proportion {
            color: #AAAAAA;
          }

        }
        .ratio-bottom {
          height: 10px;
          background: #F0F2F2;
          border-radius: 5px;
          margin-bottom: 5px;
          .ratio-excute-count {
            height: 10px;
            border-radius: 5px;
          }
          .big {
            background: linear-gradient(to right, #00AE08, #3ADA42);
          }
          .small {
            background: linear-gradient(to right, #4186FF, #59D3FF);
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
