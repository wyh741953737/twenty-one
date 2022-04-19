<!--故障发生页面--->
<template>
  <div class="equipment-account">
    <simple-search-input
      placeholder="请输入设施设备名称"
      class="search-input"
      @search="onSearch"
      @clear="onSearchClear"/>
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
        <div v-for="record in recordList" :key="record.categoryId" class="record-item">
          <div class="record-left">
            <img :src="record.picUrl" alt="">
          </div>
          <div class="record-right">
            <div class="right-top flex">
              <span class="device-name">{{record.deviceName}}</span>
              <span :class="{'status':true, 'normal': record.deviceStatus===1, 'cancel': record.deviceStatus===2, 'fault':record.deviceStatus===0, 'delete': record.deviceStatus===3}">{{deviceStatus[record.deviceStatus]}}</span>
            </div>
            <div class="record-text">最近维保时间：{{record.lastModifiedTime}}</div>
            <div class="record-text">责任人：<span>{{record.chargerName}}</span>{{location}}</div>
          </div>
        </div>
      </rm-list>
    </rm-pull-refresh>
    <div class="filter-wrapper" @click="showPopup">
      <i class="iconfont remain-filter" />
      <span>筛选</span>
    </div>
    <device-select
      v-model="filterShow"
      @click="filter" />
  </div>
</template>

<script>
import Vue from 'vue'
import { rmPullRefresh, rmList } from 'remain-ui'
import { listDeviceInfo } from './api'
import { commonBridge } from 'remain-js-sdk'
import DeviceSelect from './components/deviceSelect'
import { deviceStatus } from './map'
const { components } = Vue.prototype.$getMicroAppExternals()
const { SimpleSearchInput, EmptyView } = components

export default {
  name: 'companyOrProjectList',
  components: {
    EmptyView,
    SimpleSearchInput,
    DeviceSelect,
    rmPullRefresh,
    rmList
  },
  data () {
    return {
      deviceStatus,
      curPage: 0,
      pageSize: 20,
      recordList: [],
      isRefreshing: false,
      isLoadingMore: false,
      hasMoreData: false,
      loadMoreFailed: false,
      filterShow: false, // 显示筛选对话框
      deviceName: undefined, // 设备台账名称
      filterData: {
        deviceStatus: undefined, // 设备台账状态
        categoryId: undefined, // 设备台账分类
        isHaveMaintCharger: undefined, // 是否有维保负责人 0无 1有
        isHavePatrolCharger: undefined, // 是否有巡检负责人 0无 1有
        isNormal: undefined // 是否正常 0-故障 1-正常
      },
      isSearch: undefined // 是否支持搜索全部园区 0-否 1-是
    }
  },
  created () {
    let _this = this
    const { categoryId } = this.$route.query
    this.filterData.categoryId = categoryId
    commonBridge.commonSetTitle('设备台账列表')
    setTimeout(() => {
      _this.pullRefresh()
    }, 0)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.pullRefresh()
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    onSearch (value) {
      // 搜索的时候将筛选字段清空
      this.filterData = {
        deviceStatus: undefined, // 设备台账状态
        categoryId: this.$route.query.categoryId, // 设备台账分类
        isHaveMaintCharger: undefined, // 是否有维保负责人 0无 1有
        isHavePatrolCharger: undefined, // 是否有巡检负责人 0无 1有
        isNormal: undefined // 是否正常 0-故障 1-正常
      }
      this.deviceName = value.replace(/\s*/g, '')
      this.getData(true)
    },
    onSearchClear () {
      this.onSearch(undefined)
    },
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
      let params = {
        curPage: refresh ? 1 : (this.curPage + 1),
        pageSize: this.pageSize,
        isSearch: 1,
        communityId: localStorage.getItem('selectedCommunityId') || this.userInfo.defCommunityId,
        regionId: localStorage.getItem('selectedCompanyId') || this.defCommunityId.orgId,
        deviceName: this.deviceName,
        ...this.filterData
      }
      const obj = {}
      Object.keys(params).forEach(key => {
        if (params[key] !== '') {
          obj[key] = params[key]
        }
      })
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url: listDeviceInfo,
          params: obj
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
      this.recordList = []
      this.isRefreshing = true
      this.onRefresh()
    },
    // 筛选的回调
    filter (data, show) {
      this.filterData = data
      this.filterShow = show
      this.recordList = []
      this.curPage = 0
      this.getData(true)
    },
    showPopup () {
      this.filterShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.equipment-account {
  position: relative;

  .empty-view {
    position: absolute;
    top: 52px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .search-input {
    background-color: #C9C9CE;
  }

  .pull-refresh {
    .list {
      min-height: calc(100vh - 52px);
      box-sizing: border-box;
      padding-bottom: 40px;
      .record-item {
        display: flex;
        background: #FFFFFF;
        margin: 8px 0;
        padding: 15px;
        .record-left {
          img {
            margin-right: 12px;
            width: 44px;
            height: 44px;
          }
        }
        .record-right {
          flex: 1;
          .right-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            font-weight: 600;
            .device-name {
              font-size: 17px;
              line-height: 24px;
              color: #334455;
            }
            .status {
              line-height: 21px;
            }
            .normal {
              color: #00AE08;
            }
            .cancel {
              color: #AAAAAA;
            }
            .fault {
              color: #C6444C;
            }
            .delete {
              color: red;
            }
          }
          .record-text {
            margin-top: 5px;
            font-size: 12px;
            line-height: 16.5px;
            color: #334455;
            span {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  .filter-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #334455;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .remain-filter {
      font-size: 20px;
    }
  }
}
</style>
