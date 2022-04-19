<!--故障次数/时间前20页面、故障发生（电梯）系统页面---->
<template>
  <div class="fault-page-wrap">
    <empty-view
      v-if="recordList.length === 0"
      :content="$t('base.noContentForNow')"
      class="empty-view"/>
    <rm-pull-refresh
      v-model="isRefreshing"
      class="pull-refresh"
      @refresh="onRefresh">
      <rm-list
        v-model="isLoadingMore"
        :finished="!hasMoreData"
        :error.sync="loadMoreFailed"
        :error-text="$t('base.loadMoreErrorText')"
        :immediate-check="false"
        class="list"
        @load="onLoadMore">
        <div
            v-for="record in recordList"
            :key="record.id"
            >
            <SystemCard :cardItem="record" :showFailureNum="type!=='timeMax'"/>
        </div>
      </rm-list>
    </rm-pull-refresh>
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
import { rmPullRefresh, rmList, rmPopup, rmDatetimePicker } from 'remain-ui'
import { getLongTimeFaultList, getFrequencyList, getDeviceFailureInfoDetailList } from './api'
import SystemCard from './components/systemCard'
import selectIcon from './images/2x/nextblack_icon_place@2x.png'

import { commonBridge } from 'remain-js-sdk'
const { components } = Vue.prototype.$getMicroAppExternals()
const { EmptyView } = components

export default {
  name: 'FaultPage',
  components: {
    rmPullRefresh,
    rmList,
    EmptyView,
    SystemCard,
    rmPopup,
    rmDatetimePicker
  },
  data () {
    return {
      selectIcon,
      curPage: 0,
      pageSize: 20,
      recordList: [],
      isRefreshing: false,
      isLoadingMore: false,
      hasMoreData: false,
      loadMoreFailed: false,
      monthVisible: false,
      currentDate: new Date(),
      type: ''
    }
  },
  created () {
    let _this = this
    this.type = this.$route.query.type
    switch (this.type) {
      case 'timeMax' : { // 获取故障时长前20
        commonBridge.commonSetTitle('长时间故障')
        break
      }
      case 'frequencyMax': { // 获取故障次数前20
        commonBridge.commonSetTitle('频繁故障设备')
        break
      }
      case 'faultList': { // 某个故障列表
        const title = this.$route.query.categoryName
        commonBridge.commonSetTitle(title)
        break
      }
      default: break
    }
    setTimeout(() => {
      _this.pullRefresh()
    }, 0)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.pullRefresh()
    })
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
    /**
     * 从接口请求数据
     *
     * @param refresh 是否是刷新
     * @returns {Promise<number|*>}
     */
    async getData (refresh) {
      if (refresh) {
        this.recordList = []
      }
      const params = {
        curPage: refresh ? 1 : (this.curPage + 1),
        pageSize: this.pageSize,
        date: `${this.selectedYear}-${this.selectedMonth}`
      }

      try {
        let url
        switch (this.type) {
          case 'timeMax' : { // 获取故障时长前20
            url = getLongTimeFaultList
            break
          }
          case 'frequencyMax': { // 获取故障次数前20
            url = getFrequencyList
            break
          }
          case 'faultList': { // 某个故障列表
            url = getDeviceFailureInfoDetailList
            params.categoryId = this.$route.query.categoryId
            break
          }
          default: break
        }
        const { status, data } = await this.$axios({
          method: 'get',
          url,
          params
        })
        if (status === 100 && data) {
          const pageResult = data.pageResult
          if (pageResult) {
            this.curPage = pageResult.curPage
            this.hasMoreData = pageResult.hasMore
          }
          const resultList = data.resultList || []
          if (refresh) {
            this.recordList = resultList
          } else {
            this.loadMoreFailed = false
            this.recordList.push(...resultList)
          }
        }
        return status
      } catch (e) {
        return -1
      }
    },
    /**
     * 刷新
     */
    async onRefresh () {
      await this.getData(true)
      this.isRefreshing = false
    },
    /**
     * 加载更多
     */
    async onLoadMore () {
      const status = await this.getData(false)
      this.isLoadingMore = false
      if (status !== 100) {
        this.loadMoreFailed = true
      }
    },
    pullRefresh () {
      if (this.isRefreshing) return
      window.scrollTo(0, 0)
      this.isRefreshing = true
      this.onRefresh()
    },
    // 月份选择确定
    async onConfirm (val) {
      this.currentDate = val
      this.getData(true)
      this.monthVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.fault-page-wrap {
  position: relative;

  .search-input {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .empty-view {
    position: absolute;
    top: 52px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .pull-refresh {
    padding-top: 42px;

    .list {
      min-height: calc(100vh - 52px);
      box-sizing: border-box;
      padding-bottom: 40px;
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
      margin:0 5px;
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
