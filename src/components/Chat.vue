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
  width:900px;
  height:550px;
  margin:10px auto;
  padding-left:250px;
  box-shadow:0 0 1px black;
  border-radius:2px;
}
.right {
  float:left;
  width:100%;
  height:550px;
}
.left {
  float:left;
  position:relative;
  left:-250px;
  margin-left:-100%;
  width:250px;
  height:550px;
  background-color:RGB(245, 150, 170);
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