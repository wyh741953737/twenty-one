<template>
  <div>
    <simple-search-input
      :placeholder="placeholder"
      class="search-input"
      @search="onSearch"
      @clear="onSearchClear"/>
    <div class="list" v-for="record in recordList" :key="record.id" @click="toEquipmentPage(record.id, type === 'company' ? record.regionName : record.communityName)">
      <div class="item van-hairline--top">{{type === 'company' ? record.regionName : record.communityName}}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getProjectList, getCompanyList } from './api'
import { commonBridge } from 'remain-js-sdk'
const { components } = Vue.prototype.$getMicroAppExternals()
const { SimpleSearchInput } = components

export default {
  name: 'Search',
  components: {
    SimpleSearchInput
  },
  data () {
    return {
      searchKeyword: '',
      type: undefined,
      recordList: [],
      placeholder: ''
    }
  },
  created () {
    this.type = this.$route.query && this.$route.query.type
    this.placeholder = this.type === 'project' ? '请输入项目' : '请输入分公司'
    const title = this.type === 'project' ? '选择项目' : '选择分公司'
    commonBridge.commonSetTitle(title)
  },
  methods: {
    onSearch (value) {
      this.searchKeyword = value
      this.getData()
    },
    onSearchClear () {
      this.onSearch(undefined)
    },
    async getData () {
      const params = {}
      let url
      if (this.type === 'project') {
        url = getProjectList
        params.communityName = this.searchKeyword.replace(/\s*/g, '')
        params.regionId = localStorage.getItem('selectedCompanyId')
      }
      if (this.type === 'company') {
        url = getCompanyList
        params.regionName = this.searchKeyword
      }
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url,
          params
        })
        if (status === 100 && data) {
          this.recordList = data.resultList
        }
        return status
      } catch (e) {
        return -1
      }
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
.list {
  background: #FFFFFF;
  padding: 0 15px;
  font-size: 15px;
  .item {
    padding: 10px 0;
  }
}
</style>
