<template>
  <div class="chat">
    <header></header>
    <div class="body">
      <div class="right">
        <ChatInterface />
      </div>
      <div class="left">
        <UserListInterface />
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<style scoped>
.body {
  width:1000px;
  height:600px;
  margin:10px auto;
  padding-left:280px;
  border-radius:2px;
}
.right {
  float:left;
  width:100%;
  height:600px;
}
.left {
  float:left;
  position:relative;
  left:-280px;
  margin-left:-100%;
  width:280px;
  height:600px;
  background-color:#2e3238;
  color:white;
}
</style>

<script>
import ChatInterface from './ChatInterface'
import UserListInterface from './UserListInterface'
export default {
  components: {ChatInterface, UserListInterface},
  mounted () {
    this.$store.commit({
      type: 'setUsername',
      username: sessionStorage.getItem('username')
    })
    this.$store.commit({
      type: 'setPassword',
      password: sessionStorage.getItem('password')
    })
    this.$store.commit({
      type: 'setFriendlist',
      friendlist: JSON.parse(sessionStorage.getItem('friendlist'))
    })
    this.$store.commit({
      type: 'setRoomlist',
      roomlist: JSON.parse(sessionStorage.getItem('roomlist'))
    })
    console.log(this.$store)
  }
}
</script>