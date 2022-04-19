<!--漏巡检/维保组件页面---->
<template>
  <div class="missed-check-page">
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
          <div v-for="record in recordList" :key="record.id">
            <SystemCard :cardItem="record" />
          </div>
      </rm-list>
    </rm-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue'
import { rmPullRefresh, rmList } from 'remain-ui'
import { getMissingExecutionTaskInfoList } from './api'
import SystemCard from './components/systemCard'
import selectIcon from './images/2x/nextblack_icon_place@2x.png'
const { components } = Vue.prototype.$getMicroAppExternals()
const { EmptyView } = components

export default {
  name: 'transportationSystem',
  components: {
    rmPullRefresh,
    rmList,
    EmptyView,
    SystemCard
  },
  props: {
    dateAndActive: Object
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
      selectIcon
    }
  },
  watch: {
    dateAndActive: {
      deep: true,
      handler: function (newVal, oldVal) {
        if (newVal.active !== oldVal.active || newVal.selectedDate !== oldVal.selectedDate) {
          this.curPage = 0
          this.onRefresh()
        }
      }
    }
  },
  created () {
    let _this = this
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
      return new Date(this.dateAndActive.selectedDate).getFullYear()
    },
    selectedMonth () {
      let month = new Date(this.dateAndActive.selectedDate).getMonth() + 1
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
        date: `${this.selectedYear}-${this.selectedMonth}`,
        taskType: this.dateAndActive.active
      }
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url: getMissingExecutionTaskInfoList,
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
    }
  }
}
</script>

<style lang="scss" scoped>
.missed-check-page {
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
    }
  }
}
</style>
