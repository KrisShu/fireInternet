import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}, // 用户登录信息
  },
  mutations: {
    setUserInfo(state, payload = {}) {
      state.userInfo = payload ? payload : {};
    }
  },
  actions: {
  },
  modules: {
  }
})
