<template>
  <div>
    <div class="list">
      <ListBar v-for="friend in friendlist"
               :name="friend"
               :key="friend"
               :msg="msg"
               />
    </div>
    <div class="list">
      <ListBar v-for="room in roomlist"
               :name="room"
               :key="room"
               :msg="msg"
               />
    </div>
  </div>
</template>

<style scoped>
.list {
  margin:0;
  padding:0;
}
</style>

<script>
import io from 'socket.io-client'
import ListBar from './subcomponents/ListBar'
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
      msg: {}
    }
  },
  computed: mapState(['username', 'friendlist', 'roomlist']),
  components: {ListBar},
  mounted () {
    socket.on('message', function (data) {
      this.msg = data
    }.bind(this))
    this.$store.commit({
      type: 'setSocket',
      socket: socket
    })
    console.log(this.$store.state)
  }
}
</script>