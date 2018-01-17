<template>
  <div class="list-bar" @click="clickHandler" :class="{active: isActive}">
    <img src="../../assets/logo.png">
    <ul>
      <li>{{name}}</li>
      <li>{{recentmsg}}</li>
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
}
.list-bar img {
  display:inline-block;
  width:40px;
  height:40px;
  border:1px solid white;
  vertical-align:top;
  float:left;
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
}
.list-bar li:first-child {
  font-size:16px;
}
.list-bar li:last-child {
  max-width:120px;
  font-size:12px;
  color:#b5b5b5;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.active {
  background-color: rgb(248, 195, 205);
}
</style>

<script>
export default {
  name: 'ListBar',
  data () {
    return {
      msglist: []
    }
  },
  props: ['name', 'msg'],
  methods: {
    clickHandler () {
      this.$store.commit({
        type: 'setMsgreceiver',
        msgreceiver: this.name
      })
      this.$store.commit({
        type: 'setMsglist',
        msglist: this.msglist
      })
    }
  },
  computed: {
    msgcount () {
      return this.msglist.length
    },
    recentmsg () {
      if (this.msglist.length > 0) {
        return this.msglist[this.msglist.length-1]['data']
      } else {
        return ''
      }
    },
    selfmsg () {
      return this.$store.state.selfmsg
    },
    isActive () {
      return this.$store.state.msgreceiver === this.name
    }
  },
  watch: {
    msg (val) {
      if (val['from'] === this.name) {
        this.msglist.push(val)
      }
    },
    selfmsg (val, oldval) {
      if (val['to'] === this.name) {
        this.msglist.push(val)
        sessionStorage.setItem('msglist-' + this.name, JSON.stringify(this.msglist))
      }
    }
  },
  mounted () {
    if (sessionStorage.getItem('msglist-' + this.name)) {
      console.log(this.name)
      this.msglist = JSON.parse(sessionStorage.getItem('msglist-' + this.name))
    }
  }
}
</script>