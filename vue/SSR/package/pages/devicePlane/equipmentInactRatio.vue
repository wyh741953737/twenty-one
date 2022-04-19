<!--设备完好率---->
<template>
  <div class="equipment-inact-ratio">
    <empty-view
      v-if="recordList.length === 0"
      :content="$t('base.noContentForNow')"
      class="empty-view"/>
    <div class="list" v-else>
      <div
       v-for="record in recordList"
       :key="record.id"
       @click="toDeviceAccount(record.categoryId)"
       >
       <div class="record-item">
         <div class="ratio-top flex">
           <div class="flex"><img class="ratio-icon" :src="systemIcon[record.categoryId]" /><span>{{record.categoryName}}</span></div>
           <img class="arrow-right" :src="arrow" />
         </div>
         <div class="ratio-bottom flex">
           <div>
             <div class="left-text">设备总数<span class="ratio-left-total">{{record.deviceNum}}</span></div>
             <div class="left-text">故障设备<span class="ratio-left-total">{{record.deviceFailureNum}}</span></div>
           </div>
           <div class="ratio-right">
             <div class="ratio-right-text">完好率</div>
             <div class="ratio-right-number">{{record.equipmentIntactRate}}</div>
           </div>
         </div>
       </div>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getDeviceInactRateList } from './api'
import { commonBridge } from 'remain-js-sdk'
import arrow from './images/2x/deviceRateArrow@2x.png'
import { systemIcon } from './map'
const { components } = Vue.prototype.$getMicroAppExternals()
const { EmptyView } = components

export default {
  name: 'ExcuteRate',
  components: {
    EmptyView
  },
  data () {
    return {
      recordList: [],
      arrow,
      systemIcon
    }
  },
  mounted () {
    commonBridge.commonSetTitle('设备完好率')
    this.getData()
  },
  methods: {
    async getData () {
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url: getDeviceInactRateList
        })
        if (status === 100 && data) {
          this.recordList = data || []
        }
      } catch (e) {
        return -1
      }
    },
    toDeviceAccount (categoryId) {
      this.$router.push({
        name: '/LM_FE_H5_DevicePanel_LC/equipmentAccount',
        query: {
          categoryId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.equipment-inact-ratio {
  position: relative;
  .empty-view {
    position: absolute;
    top: 52px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
    .list {
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
          margin-bottom: 21.5px;
          font-size: 18px;
          font-weight: 600;
          line-height: 25px;
          color: #334455;
          .ratio-icon {
            width: 22px;
            height: 22px;
            margin-right: 5px;
          }
          .arrow-right {
            width: 16px;
            height: 16px;
          }
        }
        .ratio-bottom {
          font-size: 12px;
          line-height: 16.5px;
          .left-text:first-child {
            margin-bottom: 5px;
          }
          .left-text {
            display: flex;
            align-items: center;
          }
          .ratio-left-total {
            font-size: 20px;
            font-weight: 600;
            line-height: 28px;
            margin-left: 15px;
           }
          .ratio-right {
            padding: 9px 13px;
            background: #F7F8FA;
            border-radius: 3px;
            text-align: center;
            .ratio-right-number {
              font-size: 18px;
              font-weight: 600;
              line-height: 25px;
              color: #00AE08;
            }
            .ratio-right-text {
              color: #333333;
            }
          }
        }
      }
    }
}
</style>
