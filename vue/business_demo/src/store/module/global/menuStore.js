import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios'
import menuStore from './module/global/menuStore'
import searchStore from './module/global/searchStore'
import mapStore from './module/global/mapStore'
import keepAliveStore from './module/global/keepAliveStore'
import iotCommunityStore from './module/iot/iotCommunityStore'
import houseProfileStore from './module/houseProfile/houseProfileStore'
import roomManageStore from './module/houseProfile/roomManageStore'
import defaultTheme from 'common/defaultTheme'
import workTopStore from './module/workTop/workTopStore'
import customTableStore from './module/customForm/customTableStore'
import bellStore from './module/bellData/bellData'
import modules from 'LM_FE_MODULES'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menuStore,
    searchStore,
    mapStore,
    keepAliveStore,
    iotCommunityStore,
    houseProfileStore,
    roomManageStore,
    workTopStore,
    customTableStore,
    bellStore,
    ...modules.store
  },
  state: {
    VersionUpgrade: false,
    intervalId: undefined,
    token: '',
    theme: {},
    themeSetFinish: false,
    breadcrumb: [],
    permission: {},
    userInfo: {},
    baseConfig: {
      i18n: false
    },
    curOrgIds: [],
    orgOps: [],
    contractTemplate: [],
    pilotCommunitys: [] // 试点
  },
  mutations: {
    setVersionUpgrade (state, VersionUpgrade) {
      state.VersionUpgrade = VersionUpgrade
    },
    setIntervalId (state, intervalId) {
      state.intervalId = intervalId
    },
    setToken (state, token) {
      state.token = token
    },
    setTheme (state, theme) {
      state.theme = theme
      state.themeSetFinish = true
    },
    clearTheme (state) {
      state.theme = {}
      state.themeSetFinish = false
    },
    setBreadcrumb (state, options) {
      let _options
      if (typeof options === 'string') {
        _options = {
          reset: false,
          breadcrumb: [options]
        }
      } else {
        _options = options
      }
      let { reset, breadcrumb } = _options
      if (typeof breadcrumb === 'string') {
        breadcrumb = [breadcrumb]
      }
      if (Array.isArray(breadcrumb)) {
        // setTimeout(() => {
        if (reset) {
          state.breadcrumb = breadcrumb
        } else {
          state.breadcrumb = state.breadcrumb.concat(breadcrumb)
        }
        // }, 300)
      }
    },
    setPermission (state, permission) {
      state.permission = permission
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setBaseConfig (state, baseConfig) {
      state.baseConfig = {
        ...state.baseConfig,
        ...baseConfig
      }
    },
    setCurOrgIds (state, curOrgIds) {
      state.curOrgIds = curOrgIds
    },
    setOrgOps (state, orgOps) {
      state.orgOps = orgOps
    },
    setContractTemplate (state, contractTemplate) {
      state.contractTemplate = contractTemplate
    },
    setPilotCommunity (state, data) {
      state.pilotCommunitys = data
    }
  },
  actions: {
    async queryTheme ({ commit }) {
      commit('setTheme', defaultTheme)
    }
  },
  getters: {
    getVersionUpgrade: state => {
      return state.VersionUpgrade
    },
    getBreadcrumb: state => {
      let breadcrumb = [...new Set(state.breadcrumb)]
      return breadcrumb
    },
    getPermission: (state) => (key) => {
      if (typeof key === 'boolean') {
        return key
      }
      if (key) {
        return state.permission[key] === 1
      }
      return true
    },
    getUserInfo: state => {
      return state.userInfo
    },
    getCurOrgIds: state => state.curOrgIds
  }
})
