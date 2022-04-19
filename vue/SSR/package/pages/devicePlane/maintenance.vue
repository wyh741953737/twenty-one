<!--维保即将到期--->
<template>
  <div class="maintenance-wrap">
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
        <div v-for="(record, index) in recordList" :key="record.id" class="record-item">
          <div class="expire-company">{{record.maintCompanyName}}</div>
          <div class="expire-time van-hairline--bottom">合同起止时间：{{getTime(record.contractStartTime)}}至{{getTime(record.contractEndTime)}}</div>
          <div class="flex">
            <div class="expire-text"><img class="expire-device-icon" :src="deviceIcon" />共{{record.maintDeviceNum}}台设备</div>
            <span :class="{'expire-text': true, 'first-item': index===0}">{{record.expireTime}}天后到期</span>
          </div>
        </div>
      </rm-list>
    </rm-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue'
import { rmPullRefresh, rmList } from 'remain-ui'
import { getMaintExpireList } from './api'
import deviceIcon from './images/2x/device@2x.png'
import { commonBridge } from 'remain-js-sdk'
const { components } = Vue.prototype.$getMicroAppExternals()
const { EmptyView } = components

export default {
  name: 'Maintenance',
  components: {
    rmPullRefresh,
    rmList,
    EmptyView
  },
  data () {
    return {
      curPage: 0,
      pageSize: 20,
      recordList: [],
      isRefreshing: false,
      isLoadingMore: false,
      hasMoreData: false,
      loadMoreFailed: false,
      deviceIcon
    }
  },
  created () {
    let _this = this
    commonBridge.commonSetTitle('维保即将到期')
    setTimeout(() => {
      _this.pullRefresh()
    }, 0)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.pullRefresh()
    })
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
        pageSize: this.pageSize
      }
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url: getMaintExpireList,
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
    // 截取时间
    getTime (time) {
      if (time && time.indexOf(' ') > 0) {
        return time.split(' ')[0]
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.maintenance-wrap {
  position: relative;

  .empty-view {
    position: absolute;
    top: 52px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .pull-refresh {
    // padding-top: 52px;
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
        border-radius: 5px;
        .expire-company {
          margin-bottom: 10px;
          font-size: 15px;
          font-weight: 500;
          color: #334455;
          line-height: 21px;
        }
        .expire-time {
          margin-bottom: 15px;
          padding-bottom: 15px;
          font-size: 12px;
          line-height: 16.5px;
          color: #717889;
        }
        .expire-text {
          font-size: 12px;
          color: #334455;
          line-height: 16.5px;
          .expire-device-icon {
            width: 13px;
            height: 13px;
            margin-right: 5px;
          }
        }
        .first-item {
          color: #C6444C;
        }
      }
    }
  }
}
</style>
