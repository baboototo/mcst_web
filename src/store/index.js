import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    loadingBarStatus: false,
    subMenuItems: [],
    trendKeywords: [] // 인기검색어
  },
  getters: {
    findSubMenu: state => (id) => {
      return state.subMenuItems.find(item => item.id === id)
    },
    findAllSubMenu: state => () => {
      return state.subMenuItems
    },
    trendKeywords(state) {
      return state.trendKeywords
    }
  },
  mutations: {
    showLoadingBar(state) {
      state.loadingBarStatus = true
    },
    hiddenLoadingBar(state) {
      state.loadingBarStatus = false
    },
    addSubMenuItem(state, addSubMenuItems) {
      state.subMenuItems.push(addSubMenuItems)
    },
    trendKeywords(state, value){
      state.trendKeywords.push(value)
    }
  },
  actions: {
    addSubMenuItem({state, getters, commit}, {id, items}) {
      const findSubMenu = getters.findSubMenu(id)
      if (findSubMenu) {
        return
      }
      commit('addSubMenuItem', {id: id, items: items})
    },

    trendKeywords({state, getters, commit}, items) {
      commit('trendKeywords', items)
    },
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    })
  ]

})
