<!--故障发生页面--->
<template>
  <div class="company-list">
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
        <div v-for="record in recordList" :key="record.id" class="record-item">
          <div class="company van-hairline--bottom" @click="toEquipmentPage(record.id, type === 'company' ? record.regionName : record.communityName)">{{type === 'company' ? record.regionName : record.communityName}}</div>
        </div>
      </rm-list>
    </rm-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue'
import { rmPullRefresh, rmList } from 'remain-ui'
import { getCompanyList, getProjectList } from './api'
import { baseBridge, handlerBridge, commonBridge } from 'remain-js-sdk'
const { components } = Vue.prototype.$getMicroAppExternals()
const { EmptyView } = components

export default {
  name: 'companyOrProjectList',
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
      type: undefined
    }
  },
  created () {
    let _this = this
    this.type = this.$route.query && this.$route.query.type
    const title = this.type === 'project' ? '搜索项目' : '搜索分公司'
    commonBridge.commonSetTitle(title)
    setTimeout(() => {
      _this.pullRefresh()
    }, 0)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.pullRefresh()
      vm.bridgeInit()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.showNavAboutButtonAction(false)
    next()
  },
  methods: {
    /**
     * 从接口请求数据
     *
     * @param refresh 是否是刷新
     * @returns {Promise<number|*>}
     */
    async getData (refresh) {
      const params = {
        curPage: refresh ? 1 : (this.curPage + 1),
        pageSize: this.pageSize
      }
      if (this.type === 'project') {
        params.regionId = localStorage.getItem('selectedCompanyId')
      }
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url: this.type === 'company' ? getCompanyList : getProjectList,
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
    // 右上角按钮设置
    bridgeInit () {
      let _this_ = this
      if (window.WebViewJavascriptBridge) {
        _this_.showNavAboutButtonAction(true)
        _this_.$nextTick(() => {
          handlerBridge.registerHandler('about_action', () => {
            // 跳转进入分公司搜索
            _this_.$router.push({
              name: '/LM_FE_H5_DevicePanel_LC/search',
              query: {
                type: _this_.$route.query.type,
                token: '5a78d926-5d02-4447-9249-0d82ed511e99',
                defCommunityId: '9e1afefa-2548-11e5-901d-ac853da49bf6'
              }
            })
          })
        })
      }
    },
    // 设置appNav按钮
    showNavAboutButtonAction (isShow) {
      console.log('ssssss', this)
      let data = {
        show: isShow,
        icons: ['search_icon']
      }
      baseBridge.appNavRightButton(data)
    },
    // 选择了分公司跳转到设备管理页面
    toEquipmentPage (id, name) {
      this.$router.replace({
        name: '/LM_FE_H5_DevicePanel_LC/equipmentManage',
        query: {
          id,
          name: encodeURIComponent(name),
          type: this.type
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.company-list {
  position: relative;

  .empty-view {
    position: absolute;
    top: 52px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .pull-refresh {
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
        background: #FFFFFF;
        .company {
          padding: 12px 15px;
          font-size: 15px;
          line-height: 21px;
          color: #334455;
        }
      }
    }
  }
}
</style>
