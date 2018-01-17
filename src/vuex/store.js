import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    msgreceiver: '',
    password: '',
    friendlist: [],
    roomlist: [],
    socket: {},
    msglist: [],
    selfmsg: {}
  },
  mutations: {
    setUsername (state, data) {
      state.username = data.username
    },
    setMsgreceiver (state, data) {
      state.msgreceiver = data.msgreceiver
    },
    setPassword (state, data) {
      state.password = data.password
    },
    setFriendlist (state, data) {
      state.friendlist = data.friendlist
    },
    setRoomlist (state, data) {
      state.roomlist = data.roomlist
    },
    setSocket (state, data) {
      state.socket = data.socket
    },
    setMsglist (state, data) {
      state.msglist = data.msglist
    },
    setSelfmsg (state, data) {
      state.selfmsg = data.selfmsg
    }
  }
})
