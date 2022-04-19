<!--即将年检/质保即将到期页面--->
<template>
  <div class="due-soon-wrap">
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
        <div v-for="item in recordList" :key="item.maintCompanyName">
          <div class="due-companey-name">{{item.maintCompanyName}}</div>
          <div
            v-for="(record, index) in item[dataType]"
            :key="record.id"
            class="card-item"
            >
            <Card :cardItem="record" :index="index" />
          </div>
        </div>
      </rm-list>
    </rm-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue'
import { rmPullRefresh, rmList } from 'remain-ui'
import { getMaintenanceIncomingList, getUpComingCheckList } from './api'
import Card from './components/card'
import { commonBridge } from 'remain-js-sdk'
const { components } = Vue.prototype.$getMicroAppExternals()
const { EmptyView } = components

export default {
  name: 'EpidemicPreventionIndex',
  components: {
    rmPullRefresh,
    rmList,
    EmptyView,
    Card
  },
  data () {
    return {
      showFilterDialog: false,
      curPage: 0,
      pageSize: 20,
      recordList: [],
      isRefreshing: false,
      isLoadingMore: false,
      hasMoreData: false,
      loadMoreFailed: false,
      dataType: undefined
    }
  },
  created () {
    let _this = this
    setTimeout(() => {
      _this.pullRefresh()
    }, 0)
    const { type } = this.$route.query
    if (type === 'dueSoon') { // 如果是质保即将到期
      commonBridge.commonSetTitle('质保即将到期')
      this.dataType = 'qualityAssuranceIsAboutToExpireList'
    } else if (type === 'checkSoon') { // 如果是即将进行年检
      commonBridge.commonSetTitle('即将进行年检')
      this.dataType = 'upcomingAnnualCheckDeviceList'
    }
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
      const { type } = this.$route.query
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url: type === 'dueSoon' ? getMaintenanceIncomingList : getUpComingCheckList,
          params
        })
        if (status === 100 && data) {
          const pageResult = data.resultList
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
    }
  }
}
</script>

<style lang="scss" scoped>
.due-soon-wrap {
  position: relative;

  .empty-view {
    position: absolute;
    top: 52px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .pull-refresh {
    padding-top: 10px;
    .list {
      min-height: calc(100vh - 52px);
      box-sizing: border-box;
      padding-bottom: 40px;

      .due-companey-name {
        margin: 5px 15px 0 15px;
        font-size: 15px;
        font-weight: 500;
        line-height: 21px;
        color: #334455;
      }
      .card-item {
        margin: 10px 15px;
      }
    }
  }
}
</style>
