<template>
  <div>
    <div class="user-info">
      <img src="../assets/logo.png" :title="username">
      <a>{{username}}</a>
    </div>
    <div class="user-list">
      <SearchBar />
    </div>
    <div class="switch-bar">
      <span @click="listSwitch(1)">
        <i :class="{'switch-msg': switchType !== 1, 'switch-msg-active': switchType === 1}"></i>
      </span>
      <span @click="listSwitch(2)">
        <i :class="{'switch-article': switchType !== 2, 'switch-article-active': switchType === 2}"></i>
      </span>
      <span @click="listSwitch(3)">
        <i :class="{'switch-list': switchType !== 3, 'switch-list-active': switchType === 3}"></i>
      </span>
    </div>
    <div v-show="switchType === 1">
      <div class="user-list" v-for="conversation in conversationList">
        <ConversationBar :name="conversation.name"
                         :key="conversation.name"
                         :msg="conversation.data"
        />
      </div>
    </div>
    <div v-show="switchType === 3">
      <div class="user-list" v-for="friend in friendlist">
        <ListBar :name="friend"
                 :key="friend"
                 :msg="msg"
                 />
      </div>
      <div class="user-list" v-for="room in roomlist">
        <ListBar :name="room"
                 :key="room"
                 :msg="msg"
                 />
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-info {
  height:64px;
  text-align:left;
  padding:12px 18px 12px 18px;
}
.user-info img {
  width:40px;
  height:40px;
  border-radius:20px;
  border:1px solid #ffffff;
  vertical-align:middle;
}
.user-info a {
  margin-left:5px;
  font-size:20px;
  vertical-align:middle;
}
.user-list {
  margin:0;
  padding:0;
}
.switch-bar {
  height:40px;
  padding:2px 0 3px 0;
}
.switch-bar span {
  display:inline-block;
  width:32%;
  height:35px;
  text-align:center;
  cursor:pointer;
}
.switch-bar {
  border-bottom:1px solid rgb(38, 41, 46);
}
.switch-bar i {
  display:inline-block;
  width:35px;
  height:35px;
  background: url(../assets/icon.png) no-repeat;
  background-size: 487px 462px;
}
.switch-bar .switch-msg {
  background-position: -150px -96px;
}
.switch-bar .switch-msg-active {
  background-position: -185px -96px;
}
.switch-bar .switch-article {
  background-position: -376px -322px;
}
.switch-bar .switch-article-active {
  background-position: -304px -281px;
}
.switch-bar .switch-list {
  background-position: -220px -96px;
}
.switch-bar .switch-list-active {
  background-position: -304px -246px;
}
</style>

<script>
import io from 'socket.io-client'
import SearchBar from './subcomponents/SearchBar'
import ListBar from './subcomponents/ListBar'
import ConversationBar from './subcomponents/ConversationBar'
import {mapState} from 'vuex'
let socket = io('ws://127.0.0.1:8022', {
  path: '/room',
  query: {
    from: sessionStorage.getItem('username')
  }
})
export default {
  name: 'UserListInterface',
  data () {
    return {
      msg: {},
      switchType: 1,
      conversationList: []
    }
  },
  methods: {
    listSwitch (num) {
      this.switchType = num
    },
    sortConversationList (listArr, name, data) {
      let isExist = false
      let pointer = -1
      listArr.map((data, index) => {
        if (data['name'] === name) {
          isExist = true
          pointer = index
        }
      })
      if (!isExist) {
        listArr.unshift({
          name: name,
          data: data
        })
      } else {
        let store = listArr[pointer]
        for (let i = pointer; i > 0; i--) {
          listArr[i] = listArr[i - 1]
        }
        listArr[0] = store
      }
      listArr = listArr.concat()
      return listArr
    }
  },
  computed: mapState(['username', 'friendlist', 'roomlist', 'selfmsg']),
  components: {ListBar, SearchBar, ConversationBar},
  mounted () {
    socket.on('message', function (data) {
      this.msg = data
    }.bind(this))
    this.$store.commit({
      type: 'setSocket',
      socket: socket
    })
  },
  watch: {
    msg (val) {
      this.sortConversationList(this.conversationList, val['from'], val['data'])
    },
    selfmsg (val) {
      this.sortConversationList(this.conversationList, val['to'], val['data'])
    }
  }
}
</script>