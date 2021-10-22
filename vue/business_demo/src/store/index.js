import Vue from 'vue'
import Vuex from 'vuex'
import defaultTheme from '@/common/defaultTheme'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    token: '',
    theme: {},
    themeSetFinish: false,
    userInfo: {},
    baseConfig: {
      i18n: false
    },
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setTheme (state, theme) {
      state.theme = theme
    },
    clearTheme (state) {
      state.theme = {}
      state.themeSetFinish = false
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
  },
  actions: {
    async queryTheme ({ commit }) {
      commit('setTheme', defaultTheme)
    }
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo
    },
  }
})