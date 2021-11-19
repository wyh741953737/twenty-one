<template>
  <div class="list-container">
    <div class="header">
      <!-- 配置右上角操作按钮 -->
      <slot name="headerSolt"></slot>
    </div>
    <div class="custom-content">
      <slot></slot>
    </div>
    <search-panel ref="searchPanel"
      :searchVisible="searchVisible"
      :resetVisible="resetVisible"
      :searchName="searchName"
      :exportName="exportName"
      :exportPermission="exportPermission"
      :>
      <template #searchSlot>
        <slot name="searchSlot"></slot>
      </template>
      <template #btnSlot="scope">
        <slot name="btnSlot" :searchDisabled="scope.searchDisabled"></slot>
      </template>
    </search-panel>
    <div class="table-info">
      <slot name="tableLeftSlot"></slot>
    </div>
    <div class="table-panel">
      <table-panel
        ref="tablePanel"
        v-if="tableHeaders.length && listType='table'"
        :headers=""
        :tableData=""
        :selectable=""
        :isSearching=""
        :isMultiSelect=""
        :hasOperateColumn=""
        :operateColumnLabel=""
        :operationColumnWidth=""
        :autoHeight="false"
        :handleDate=""
        :showOverflowTooltip=""
        @sortChange=""
        @handleSelectionChange=""
      >
        <template #operateSlot="scope">
          <div class="operate">
            <slot name="operateSlot"></slot>
          </div>
        </template>
        <template #empty>
          <div class="empty-wrapper">
            <img :src="emptyImgSrc" />
            <span v-text="emptyText"></span>
          </div>
        </template>
      </table-panel>
      <div ref="tablePanel" class="list-card-wrapper" v-else-if="listType=='card'">
        <div class="card-list-wrapper-box" v-if="tableData && tableData.length">
          <slot name="cardList"></slot>
        </div>
        <div class="empty-wrapper-box" v-else>
          <div class="empty-wrapper">
            <img :src="emptyImgSrc" alt="">
            <span v-text="emptyText"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="button-group">
        <div class="batch">
          <slot name="batchSlot" :selectedData="selectedData"></slot>
        </div>
        <list-option v-show="headers && headers.length" :headers="headers" @updateTableHeaders="updateTableHeaders" ></list-option>
      </div>
      <pagination-panel ref="paginationPanel" @searchData="searchData"></pagination-panel>
    </div>
  </div>
</template>

<script>
import searchPanel from '@/components/business/search-panel/search-panel'
import tablePanel from '@/components/business/table-panel/table-panel'
import paginationPanel from '@/components/business/pagination-panel/pagination-panel'
import listOption from './list-option.vue'
import emptyImgSrc from './images/empty.png'


export default {
  name: 'list',
  data () {
    return {
      name: '',
      echo: true,
      tableHeaders: [],
      tableData: [],
      isSearching: false,
      sortParams: {},
      selectedData: {
        data: [],
        ids: []
      },
      emptyImgSrc,
      emptyText: '对不起，没有找到符合条件的记录',
      message: Message,
      defaultSearchParams: {}
    }
  },
  props: {
    // 是否显示搜索按钮
    searchVisible: {
      type: Boolean,
      default: true
    },
    // 是否显示重置按钮
    resetVisible: {
      type: Boolean,
      default: true
    },
    // 鼠标悬浮显示文本
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    // 搜索按钮名称
    searchName: String,
    // 单个导出按钮名称
    exportName: String,
    // 列表数据查询接口
    searchUrl: {
      type: String,
      required: true
    },
    // 搜索项中的列表数据查询参数
    searchParams: {
      type: Object,
      // `{}`
      default () {
        return {}
      }
    },
    // 列表数据查询附加参数
    extraParams: {
      type: Object,
      // `{}`
      default () {
        return {}
      }
    },
    // 列表数据导出接口
    exportUrl: String,
    // 列表数据导出权限
    exportPermission: [Boolean, String],
    // 列表数据导出方式，默认根据exportUrl来判断（老接口直接下载文件 `old`，新接口从导出中心下载 `delay`），传递此参数可以直接指定导出方式
    exportMethod: {
      // `'old'` / `'new'` / `'delay'`
      type: String
    },
    // 列表数据导出前回调函数，返回的布尔值决定是否继续执行导出操作
    exportBefore: Function,
    // 列表数据导出参数，默认使用查询接口参数，可通过此选项进行扩展
    exportParams: {
      type: Object,
      // `{}`
      default () {
        return {}
      }
    },
    exportBySearchApi: {
      type: Boolean,
      default: false
    },
    // 配置导出按钮
    multiExport: Array,
    // 列表中每一列的配置，prop:  数据对应的key，label: 列名，formatter: 格式化数据，第一个参数为当前行的数据对象，第二个参数为当前行数
    headers: {
      type: Array,
      // `[]`
      default () {
        return []
      }
    },
    // 是否显示操作列
    hasOperateColumn: {
      type: Boolean,
      // `true`
      default: true
    },
    // 操作列名
    operateColumnLabel: {
      type: String,
      // `操作`
      default: '操作'
    },
    // 操作列列宽
    operateColumnWidth: {
      type: String
    },
    // 是否显示多选列
    isMultiSelect: Boolean,
    // 配置每行的多选列是否可用
    selectable: {
      type: Function
    },
    // 接口请求数据成功后的回调函数，可以对数据做一些预处理，第一个参数为当前行的数据对象，第二个参数为当前行数
    handleData: Function,
    // 接口请求之前的回调函数，可以对搜索条件做一些预处理
    searchBefore: Function,
    // 配置表格最小高度
    tableHeight: Number,
    // 物联网列表初始化的时候是否需要默认的园区参数
    needDefaultIotCommunity: {
      type: Boolean,
      default: true
    },
    // 屏蔽默认园区变化
    shieldDefaultIotCommunity: {
      type: Boolean,
      default: false
    },
    // 分页参数
    pageParams: {
      type: Object,
      default: () => {}
    },
    listType: {
      //  table, card
      type: String,
      default: 'table'
    }
  },
  components: {
    paginationPanel,
    tablePanel,
    searchPanel,
    listOption,
  },
  mounted() {
    this.$nextTick(() => {
      this.echo = this.extraParams === null || Object.keys(this.extraParams).length === 0
      if(this.echo) {
        this.defaultSearchParams = cloneDeep(this.searchParams)
        this.name = this.$route.name
        let searchParams = this.getListSearch(this.name)
        if (this.needModifyIotCommunity() && this.needDefaultIotCommunity) {
          // 添加物联网园区默认搜索参数
          if (searchParams) {
            searchParams.communityId = this.iotCommunityInfo.id
          } else {
            searchParams = {
              ...this.searchParams,
              communityId: this.iotCommunityInfo.id
            }
          }
          this.defaultSearchParams.communityId = this.iotCommunityInfo.id
        }
        if (searchParams) {
          this.$emit('update:searchParams', searchParams)
        }
      } else {
        let searchParams = {
          ...this.searchParams,
          ...this.extraParams
        }
        if (this.needModifyIotCommunity() && this.needDefaultIotCommunity) {
          // 添加物联网园区默认搜索参数
          searchParams.communityId = this.iotCommunityInfo.id
        }
        this.defaultSearchParams = cloneDeep(searchParams)
        this.$emit('update:searchParams', searchParams)
      }
      this.$nextTick(() => {
        this.$emit('searchDataBefore')
        this.searchData()
      })
    }, 20)
  },
  computed: {
    // 我的导出的判断
    exportShow () {
      // 权限读取
      let view = false
      let permission = true
      // let permission = this.$store.state.menuStore.menuPermission['exportcentre1']
      if (permission && permission.view === 1) {
        view = true
      }
      return view
    },
    iotCommunityInfo () {
      // 物联网当前默认园区
      return this.$store.state.iotCommunityStore.currentIotCommunity
    },
    ...mapGetters('searchStore', [
      'getListSearch'
    ])
  },
  watch: {
    iotCommunityInfo () {
      if (this.needModifyIotCommunity() && !this.shieldDefaultIotCommunity) {
        this.searchParams.communityId = this.iotCommunityInfo.id
      }
      this.searchData()
    }
  },
  beforeDestroy () {
    if (this.echo) {
      this.setListSearch({
        name: this.name,
        params: this.searchParams
      })
    }
  },
   methods: {
    needModifyIotCommunity () {
      // 是否需要修改物联网默认的园区搜索
      let need = this.searchParams && 'communityId' in this.searchParams && this.iotCommunityInfo.id && this.$route.meta.iotMenu
      return need
    },
    updateTableHeaders (tableHeaders) {
      this.tableHeaders = tableHeaders
    },
    handleSelectionChange (val) {
      this.selectedData.data = val
      let ids = []
      val.forEach((item) => {
        ids.push(item.id)
      })
      this.selectedData.ids = ids
    },
    sortChange (sort) {
      this.sortParams = sort && sort.colName ? sort : {}
      this.searchData()
    },
    handleSearchParams (postData) {
      for (let key in postData.params) {
        if (typeof postData.params[key] === 'string') {
          postData.params[key] = postData.params[key].trim()
        }
        if (postData.params[key] === null || postData.params[key] === '') {
          postData.params[key] = undefined
        }
      }
    },
    resetSearchParams () {
      const searchParams = cloneDeep(this.defaultSearchParams)
      this.$emit('update:searchParams', searchParams)
    },
    // @vuese
    // 搜索列表数据（重置页码信息和搜索项参数）
    resetPanelSearchData () {
      this.resetSearchParams()
      this.$emit('resetSearchParams')
      this.$refs.searchPanel.reRenderControl()
      this.$refs.paginationPanel.resetParams()
      this.$nextTick(() => {
        this.searchData()
      })
    },
    // @vuese
    // 搜索列表数据（重置页码信息）
    searchPanelSearchData () {
      this.$refs.paginationPanel.resetParams()
      this.searchData()
    },
    // @vuese
    // 搜索列表数据
    async searchData (searchParams = {}) {
      let _this = this
      let paginationParams = _this.$refs.paginationPanel.getParams()
      let postData = {
        params: {
          ..._this.searchParams,
          ..._this.sortParams,
          ...paginationParams,
          ...searchParams,
          ..._this.pageParams
        }
      }
      _this.handleSearchParams(postData)
      let searchBeforeResult = _this.searchBefore ? await _this.searchBefore(postData) : true
      if (!searchBeforeResult) {
        return
      }
      _this.$nextTick(() => {
        _this.$refs.searchPanel.controlStatusChange()
      })
      _this.isSearching = true
      _this.$refs.searchPanel.setSearchDisabled(true)
      _this.$refs.paginationPanel.setDisabled(true)
      _this.$axios.get(_this.searchUrl, postData).then(res => {
        // 用户快速切换左侧菜单时, 接口返回数据之后DOM已经不存在, 继续执行会报错而且没必要继续执行
        if (!_this.$refs.tablePanel) {
          return
        }
        if (res.status == 100) { // eslint-disable-line
          let data = res.data || {}
          // 解决有多页数据，最后一页只有一条数据时 删除该条数据后重新请求当前页数据无数据返回  （批量删除也有同样问题）
          if ((!(data.resultList) || (Array.isArray(data.resultList) && data.resultList.length === 0)) && data.curPage > 1) {
            paginationParams.curPage -= 1
            _this.searchData()
            return false
          }
          _this.tableData = data.resultList || []
          _this.$refs.paginationPanel.setParams({
            maxPage: data.maxPage,
            maxRow: data.maxRow,
            row: data.row
          })
          this.$refs.tablePanel.tableToTop && this.$refs.tablePanel.tableToTop()
          // 搜索成功回调
          // @arg 接口响应参数
          _this.$emit('searchSuccess', res)
        } else {
          _this.tableData = []
          // 搜索失败回调
          // @arg 接口响应参数
          _this.$emit('searchError', res)
        }
        _this.isSearching = false
        _this.$refs.searchPanel.setSearchDisabled(false)
        _this.$refs.paginationPanel.setDisabled(false)
      })
    },
    // @vuese
    // 导出列表数据
    getSearchParams (searchParams = {}) {
      let _this = this
      let paginationParams = _this.$refs.paginationPanel.getParams()
      return {
        params: {
          ..._this.searchParams,
          ..._this.sortParams,
          ...paginationParams,
          ...searchParams
        }
      }
    },
    // @vuese
    // 导出列表数据
    async exportData (index) {
      let _this = this
      let exportUrl, exportMethod, exportBefore
      if (index !== -1) {
        let { url, method, before } = _this.multiExport[index]
        exportUrl = url
        exportMethod = method
        exportBefore = before
      } else {
        exportUrl = _this.exportUrl
        exportMethod = _this.exportMethod
        exportBefore = _this.exportBefore
      }
      if (_this.exportBySearchApi) {
        exportUrl = _this.searchUrl
      }
      if (!exportUrl) {
        return
      }
      let postData = {
        params: {
          ..._this.searchParams,
          ..._this.exportParams
        }
      }

      let result = exportBefore ? await exportBefore(postData) : true
      if (!result) {
        return
      }
      let exportOptions = {
        exportUrl,
        postData
      }
      _this.handleSearchParams(postData)
      _this.$refs.searchPanel.setExportDisabled(true)
      if (exportMethod && exportMethod === 'old') {
        _this.oldExport(exportOptions)
      } else if (exportMethod && exportMethod === 'new') {
        _this.newExport(exportOptions)
      } else if (exportMethod && exportMethod === 'delay') {
        _this.delayExport(exportOptions)
      } else if (exportUrl.indexOf('!') !== -1) {
        _this.oldExport(exportOptions)
      } else {
        _this.delayExport(exportOptions)
      }
    },
    oldExport (ops) {
      let { exportUrl, postData } = ops
      let config = {
        action: exportUrl,
        formData: postData.params
      }
      downloadHelper.downloadByAction(config)
      this.$refs.searchPanel.setExportDisabled(false)
    },
    async newExport (ops) {
      let _this = this
      let breadcrumb = _this.$store.getters.getBreadcrumb
      let title = `${breadcrumb.join(' > ')} - 导出进度`
      let exportProgressVNode = _this.$createElement('exportProgress', null)
      let notify = Notification({
        title: title,
        dangerouslyUseHTMLString: true,
        duration: 0,
        message: exportProgressVNode
      })
      downloadHelper.downloadByApi(ops, (res) => {
        if (res.status == 100) { // eslint-disable-line
          let data = res.data
          data.percent && exportProgressVNode.componentInstance.percentageChange(parseInt(data.percent))
          if (data.percent === '100') {
            _this.$refs.searchPanel && _this.$refs.searchPanel.setExportDisabled(false)
            downloadHelper.downloadByLocation(data.filePath)
            setTimeout(() => {
              notify.close()
            }, 1000)
          }
        } else {
          _this.$refs.searchPanel && _this.$refs.searchPanel.setExportDisabled(false)
          notify.close()
        }
      }, () => {
        _this.$refs.searchPanel && _this.$refs.searchPanel.setExportDisabled(false)
        notify.close()
      })
    },
    delayExport (ops) {
      let _this = this
      let { exportUrl, postData } = ops
      let headers = {}
      if (_this.exportBySearchApi) {
        headers = {
          export: 1
        }
      }
      _this.$axios({
        method: 'get',
        url: exportUrl,
        params: postData.params,
        headers
      }).then(res => {
        if (res.status == 100) { // eslint-disable-line
          _this.$message({
            type: 'success',
            message: '导出成功，请稍候前往导出中心查看进度',
            center: true
          })
        }
        _this.$refs.searchPanel.setExportDisabled(false)
      })
    },

    goExportCentre () {
      let routeName = this.exportShow ? 'exportcentre1' : 'exportcentre0'
      let currentName = this.$route.name
      if (currentName !== routeName) {
        this.$router.push({
          name: routeName
        })
      }
      this.message.closeAll()
    },
    ...mapMutations('searchStore', [
      'setListSearch'
    ])
  }
}
</script>

<style lang="scss">
  .list-container {
    .table-panel {
      .operate {
        .el-dropdown {
          color: #409EFF;
          cursor: pointer;
          font-size: inherit;
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  .list-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 20px;
    background-color: #FFF;
    .header {
      position: absolute;
      top: 20px;
      right: 20px;
      :not(:last-child) {
        margin-right: 8px;
      }
    }
    .table-panel {
      display: flex;
      flex: 1;
      overflow-x: auto;
      overflow-y: hidden;
      // border-top: 1px solid #e0e0e0;
      margin-bottom: 20px;
      .table-right {
        flex: 1;
        overflow: hidden;
      }
      .operate {
        :not(:last-child) {
          margin-right: 8px;
        }
        ::v-deep {
          .el-dropdown {
            margin-right: 8px;
            span {
              margin-right: 0;
            }
          }
        }
      }
      .empty-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 156px;
          height: 180px;
        }
      }
    }
    .list-card-wrapper{
      width: 100%;
      height: 100%;
      .card-list-wrapper-box{
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        box-sizing: border-box;
        padding-left: 20px;
      }
      .empty-wrapper-box{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .empty-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img {
            width: 156px;
            height: 180px;
          }
        }
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      flex: 0 0 auto;
      margin-bottom: 20px;
      .button-group {
        display: flex;
        .batch {
          > :nth-child(n) {
            margin-right: 12px;
          }
          > :last-child {
            padding-right: 12px;
            border-right: 1px solid #1b8cf2;
          }
        }
      }
    }
  }
</style>
