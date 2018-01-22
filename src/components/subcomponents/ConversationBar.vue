<template>
  <div class="list-bar" @click="clickHandler" :class="{active: isActive}">
    <img src="../../assets/logo.png">
    <ul>
      <li>{{name}}</li>
      <li>{{msg}}</li>
    </ul>
  </div>
</template>

<style scoped>
.list-bar {
  margin:0;
  cursor:pointer;
  width:100%;
  height:64px;
  padding:12px 18px 12px 18px;
  border-bottom: 1px solid rgb(38, 41, 46)
}
.list-bar img {
  display:inline-block;
  float:left;
  width:40px;
  height:40px;
  border-radius:2px;
  vertical-align:top;
}
.list-bar ul {
  margin:0;
  display:inline-block;
  vertical-align:top;
  float:left;
  padding:0 0 0 10px;
}
.list-bar li {
  text-align:left;
  color:#ffffff;
}
.list-bar li:first-child {
  font-size:16px;
}
.list-bar li:last-child {
  max-width:120px;
  font-size:12px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.active {
  background-color: #3a4045;
}
</style>

<script>
export default {
  name: 'ConversationBar',
  props: ['name', 'msg'],
  methods: {
    clickHandler () {
      this.$store.commit({
        type: 'setMsgreceiver',
        msgreceiver: this.name
      })
    }
  },
  computed: {
    isActive () {
      return this.$store.state.msgreceiver === this.name
    }
  }
}
</script>