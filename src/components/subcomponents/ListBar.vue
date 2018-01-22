<template>
  <div class="list-bar" @click="clickHandler" :class="{active: isActive}">
    <img src="../../assets/logo.png">
    <span>{{name}}</span>
  </div>
</template>

<style scoped>
.list-bar {
  margin:0;
  cursor:pointer;
  width:100%;
  padding:10px 18px 10px 18px;
  text-align:left;
  border-bottom: 1px solid rgb(38, 41, 46)
}
.list-bar img {
  display:inline-block;
  width:30px;
  height:30px;
  border-radius:2px;
  vertical-align:middle;
}
.list-bar span {
  vertical-align:middle;
  margin-left:5px;
}
.active {
  background-color: #3a4045;
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
    }
  },
  computed: {
    msgcount () {
      return this.msglist.length
    },
    recentmsg () {
      if (this.msglist.length > 0) {
        return this.msglist[this.msglist.length - 1]['data']
      } else {
        return ''
      }
    },
    selfmsg () {
      return this.$store.state.selfmsg
    },
    isActive () {
      return this.$store.state.msgreceiver === this.name
    },
    msgreceiver () {
      return this.$store.state.msgreceiver
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
    },
    msgreceiver (val) {
      if (val === this.name) {
        this.$store.commit({
          type: 'setMsglist',
          msglist: this.msglist
        })
      }
    }
  },
  mounted () {
    if (sessionStorage.getItem('msglist-' + this.name)) {
      this.msglist = JSON.parse(sessionStorage.getItem('msglist-' + this.name))
    }
  }
}
</script>