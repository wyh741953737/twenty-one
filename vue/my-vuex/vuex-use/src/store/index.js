import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    A: {
      state: {
        name: '模块A的数据',
        age: 0
      },
      mutations: {
        changeAge(state, value) {
          console.log('模块A的数据')
          state.age = value
        }
      },
      actions: {
        asyncChangeAge ({ commit }) {
          setTimeout(() => {
            commit('changeAge', 1)
          }, 1000);
        }
      },
      modules: {
        B: {
          state: {
            name: '模块B的数据',
            age: 20
          },
          mutations: {
            changeAge(state, value) {
              console.log('模块B的数据')
              state.age = value
            }
          },
        },
        C: {
          namespaced: true,
          state: {
            name: '模块C的数据',
            age: 20
          },
          mutations: {
            changeAge(state, value) {
              console.log('模块C的数据')
              state.age = value
            }
          },
        }
      }
    }
  },
  state: {
    userName: 'XXX',
    age: 12,
    age2: 1,
    hobby: '写代码',
    arrs: [12, 1, 2, 4]
  },
  getters: {
    fullName: state => {
      return state.userName + '已经' + state.age + '岁了'
    }
  },
  mutations: {
    changeName(state, value) {
      state.userName = value
    },
    changeAge(state, value) {
      console.log('主模块的数据')
      state.age = value
    }
  },
  actions: {
    asyncChangeAge({commit}) {
      setTimeout(() => {
        commit('changeAge', 1)
      }, 1000);
    }
  }
})

export default store